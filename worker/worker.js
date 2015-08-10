var amqp = require('amqplib');
var request = require('request');
var Vizifier = require("./vizifier.js");
var WikiArticle = require('../server/models/wikiArticle.js');
var configEnv = require('../server/config/env.js');

function getWikiPage(topic, cb) {
  var endpoint = 'https://en.wikipedia.org/w/api.php?';
  var reqParam = 'action=parse&format=json&page=' + encodeURI(topic);// + '&prop=text';
  var reqUrl = endpoint + reqParam;
  request(reqUrl, function(error, response, body) {
    body = JSON.parse(body);
    if (body.parse === undefined) {
      // handle 404 page here.
      cb('');
    } else {
      var article = body.parse.text['*'];
      var title = body.parse.title;

      if(article.indexOf("redirectMsg")>=0) {
        // TODO: make this efficient
        var links = body.parse.links;
        for(var i = 0; i < links.length; i++) {
          var l = links[i];
          if(l.ns===0) {
            title = l['*'];
          }
        }
      }
      cb(article, title);
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
        var ntitle = title.replace(/ /g, '_');
        if(ntitle === message) {
          article = Vizifier.vizify(article, title);
        } else {
          article = '';
        }
        WikiArticle.create({query: message, title: ntitle, content: article});
        // setTimeout(function() {
        ch.sendToQueue(msg.properties.replyTo,
          new Buffer(JSON.stringify({
            article:article,
            title:title
          })),
          {correlationId: msg.properties.correlationId});
        // }, 10000);
      });
      ch.ack(msg);
    }
  });
}).then(null, console.warn);
