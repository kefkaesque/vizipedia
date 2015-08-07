#!/usr/bin/env node

var amqp = require('amqplib');
var request = require('request');

function getWikiPage(topic, cb) {
  var endpoint = 'https://en.wikipedia.org/w/api.php?';
  var reqParam = 'action=parse&format=json&page=' + encodeURI(topic) + '&prop=text';
  var reqUrl = endpoint + reqParam;
  request(reqUrl, function(error, response, body) {
    if (JSON.parse(body).parse === undefined) {
      // handle 404 page here.
      cb('');
    } else {
      cb(JSON.parse(body).parse.text['*']);
    }
  });
}

amqp.connect('amqp://localhost').then(function(conn) {
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
      var response = getWikiPage(message, function(data) {
        ch.sendToQueue(msg.properties.replyTo,
                       new Buffer(data.toString()),
                       {correlationId: msg.properties.correlationId});
      });
      ch.ack(msg);
    }
  });
}).then(null, console.warn);
