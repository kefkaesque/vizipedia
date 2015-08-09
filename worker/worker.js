var amqp = require('amqplib');
var request = require('request');
var Vizifier = require("./vizifier.js");
var WikiArticle = require('../server/models/wikiArticle.js');
var configEnv = require('../server/config/env.js');

function getWikiPage(topic, cb) {
  var endpoint = 'https://en.wikipedia.org/w/api.php?';
  var reqParam = 'action=parse&format=json&page=' + encodeURI(topic) + '&prop=text';
  var reqUrl = endpoint + reqParam;
  request(reqUrl, function(error, response, body) {
    if (JSON.parse(body).parse === undefined) {
      // handle 404 page here.
      cb('');
    } else {
      body = JSON.parse(body).parse;
      cb(body.text['*'], body.title);
    }
  });
}

var url = configEnv.cloudAMQP;
amqp.connect(url).then(function(conn) {
  process.once('SIGINT', function() { conn.close(); });
  return conn.createChannel().then(function(ch) {
    var q = 'rpc_queue';
    var ok = ch.assertQueue(q, {durable: false});
    ok = ok.then(function() {
      ch.prefetch(1);
      return ch.consume(q, reply);
    });
    return ok.then(function() {
      // Awaiting requests
    });

    function reply(msg) {
      var message = msg.content.toString();
      var response = getWikiPage(message, function(article, title) {
        article = Vizifier.vizify(article, title);
        WikiArticle.create({title: title, content: article});
        // setTimeout(function() {
        ch.sendToQueue(msg.properties.replyTo,
                       new Buffer(article),
                       {correlationId: msg.properties.correlationId});
        // }, 10000);
      });
      ch.ack(msg);
    }
  });
}).then(null, console.warn);
