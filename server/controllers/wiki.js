var express = require('express');
var router = express.Router();
var request = require('request');
module.exports = router;

var amqp = require('amqplib');
var when = require('when');
var uuid = require('node-uuid');
var WikiArticle = require('../models/wikiArticle.js');
var configEnv = require('../config/env.js');

router.get('/:topic', function(req, res) {
  WikiArticle.findOne({
    where: {
      title: req.params.topic
    }
  })
  .then(function(article) {
    if(article) {
      res.locals.article = article.content;
      res.render("article");
    } else {
      queue(req, res);
    }
  });
});

var queue = function(req, res) {
  var topic = req.params.topic;
  var defer = when.defer;
  var url = configEnv.CLOUDAMQP_URL;
  amqp.connect(url).then(function(conn) {
    return when(conn.createChannel().then(function(ch) {
      var answer = defer();
      var corrId = uuid();
      var q = 'rpc_queue';
      function maybeAnswer(msg) {
        if(msg.properties.correlationId === corrId) {
          answer.resolve(msg.content.toString());
        }
      }
      var ok = ch.assertQueue(q, {exclusive: true})
        .then(function(qok) { return qok.queue; });

      ok = ok.then(function(queue) {
        return ch.consume(queue, maybeAnswer, {noAck: true})
          .then(function() { return queue; });
      });

      ok = ok.then(function(queue) {
        ch.sendToQueue(q, new Buffer(topic), {
          correlationId: corrId, replyTo: queue
        });
        return answer.promise;
      });

      return ok.then(function(data) {
        res.locals.article = data;
        res.render("article");
      });
    })).ensure(function() { conn.close(); });
  }).then(null, console.warn);
};
