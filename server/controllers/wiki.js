var express = require('express');
var router = express.Router();
var request = require('request');
module.exports = router;

var amqp = require('amqplib');
var when = require('when');
var uuid = require('node-uuid');

router.get('/:topic', function(req, res) {
  // getWikiPage(req.params.topic, function(data) {
  //   console.log("ein");
  //   res.locals.article = data;
  //   res.render("article");
  // });
  queue(req, res);
});
var queue = function(req, res) {
  var topic = req.params.topic;
  var defer = when.defer;
  amqp.connect('amqp://localhost').then(function(conn) {
    return when(conn.createChannel().then(function(ch) {
      var answer = defer();
      var corrId = uuid();
      function maybeAnswer(msg) {
        if (msg.properties.correlationId === corrId) {
          answer.resolve(msg.content.toString());
        }
      }

      var ok = ch.assertQueue('', {exclusive: true})
        .then(function(qok) { return qok.queue; });

      ok = ok.then(function(queue) {
        return ch.consume(queue, maybeAnswer, {noAck: true})
          .then(function() { return queue; });
      });

      ok = ok.then(function(queue) {
        console.log(' [x] Requesting ', topic);
        ch.sendToQueue('rpc_queue', new Buffer(topic), {
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
