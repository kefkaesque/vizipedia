var express = require('express');
var router = express.Router();
var request = require('request');
module.exports = router;

var amqp = require('amqplib');
var when = require('when');
var uuid = require('node-uuid');
var WikiArticle = require('../models/WikiArticle.js');
var VisitedArticle = require('../models/visitedArticle.js');
var Recommend = require('../models/Recommend.js');
var configEnv = require('../config/env.js');

router.get('/query/:topic', function(req, res) {
  request('https://en.wikipedia.org/w/api.php?action=query&format=json&titles='+req.params.topic, function(error, response, body) {
    var query = JSON.parse(body);
    if (query.query.normalized) {
      res.send(JSON.stringify(query.query.normalized[0].to));
    } else {
      res.send(JSON.stringify(req.params.topic));
    }
  });
});

router.get('/:topic', function(req, res) {
  WikiArticle.findOne({
    where: {
      query: req.params.topic
    }
  })
  .then(function(article) {
    if(article && article.title !== req.params.topic) {
      redirect(res, article.title);
    }
    else if(article) {
      res.locals.Locals.articleid = article.id;
      if(res.locals.user.id){
        VisitedArticle.visitIfUnvisited(res.locals.user.id, article.id);
      }
      Recommend.findAndCountAll({
        where: {
          articleId: article.id
        }
      })
      .then(function(results) {
        var data = {
          id: article.id,
          title: article.title,
          content: article.content,
          recommends: results.count
        };
        res.send(JSON.stringify(data));
      });

    } else {
      queue(req, res);
    }
  });
});

var redirect = function(res, topic) {
  res.redirect("/wiki/"+topic);
};

var queue = function(req, res) {
  var topic = req.params.topic;
  var defer = when.defer;
  var url = configEnv.cloudAMQP;
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
      var ok = ch.assertQueue('', {exclusive: true})
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
        data = JSON.parse(data);
        if (data.article === undefined) {
          res.send(JSON.stringify(data));
        } else {
          redirect(res, data.title);
        }
        // res.locals.article = "FROM REQUEST"+data.article;
        // res.render("article");
      });
    })).ensure(function() { conn.close(); });
  }).then(null, console.warn);
};
