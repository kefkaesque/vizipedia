var express    = require('express');
var router = express.Router();
var request = require('request');
module.exports = router;

router.get('/:topic', function(req, res) {
  getWikiPage(req.params.topic, function(data) {
    res.send(data);
  });
});

function getWikiPage(topic, cb) {
  var endpoint = 'https://en.wikipedia.org/w/api.php?';
  var reqParam = 'action=parse&format=json&page=' + encodeURI(topic) + '&prop=text';
  var reqUrl = endpoint + reqParam;
  request(reqUrl, function(error, response, body) {
    cb(JSON.parse(body).parse.text['*']);
  });
}

