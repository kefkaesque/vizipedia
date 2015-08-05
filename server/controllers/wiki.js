var request = require('request');

function getWikiPage(topic) {
  var endpoint = 'https://en.wikipedia.org/w/api.php?';
  var reqParam = 'action=parse&format=json&page=' + encodeURI(topic) + '&prop=text';
  var reqUrl = endpoint + reqParam;
  request(reqUrl, function(error, response, body) {
    console.log(JSON.parse(body).parse.text['*']);
  });
}

getWikiPage('San Francisco');
