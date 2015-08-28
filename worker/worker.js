var amqp = require('amqplib');
var request = require('request');
var Vizifier = require("./vizifier.js");
var WikiArticle = require('../server/models/WikiArticle.js');
var configEnv = require('../server/config/env.js');

function getWikiPage(topic, cb) {
  var endpoint = 'https://en.wikipedia.org/w/api.php?';
  var reqParam = 'action=parse&format=json&page=' + encodeURI(topic) + '&prop=text&redirects';
  var reqUrl = endpoint + reqParam;
  request(reqUrl, function(error, response, body) {
    body = JSON.parse(body);
    if (body.parse === undefined) {
      // handle 404 page here.
      cb('');
    } else {
      var article = body.parse.text['*'];
      var title = body.parse.title;
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
      var query = msg.content.toString();
      var response = getWikiPage(query, function(article, title) {
        if (!title) {
          ch.sendToQueue(msg.properties.replyTo,
            new Buffer(JSON.stringify({
              title: query
            })),
            {correlationId: msg.properties.correlationId});
            return;
        }
        var ntitle = title.replace(/ /g, '_');

        /*if(query === ntitle)
          article = Vizifier.vizify(article, title);
        else
          article = '';*/
        if(query !== ntitle)
          article = '';

        Vizifier.vizify(article, title, function(article, url) {
        //console.log("******", query, title, article.substring(0,100));
        WikiArticle.create({query: query, title: ntitle, content: article, image: url});
        /*if(query !== ntitle) {
          WikiArticle.create({query: query, title: ntitle, content: ''});
          if(query !== title)
            WikiArticle.create({query: title, title: ntitle, content: ''});
        }*/

        // setTimeout(function() {
        ch.sendToQueue(msg.properties.replyTo,
          new Buffer(JSON.stringify({
            article:article,
            title:title
          })),
          {correlationId: msg.properties.correlationId});
        // }, 10000);
        });
      });
      ch.ack(msg);
    }
  });
}).then(null, console.warn);
