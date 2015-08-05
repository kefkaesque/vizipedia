var request = require('request');

function getWikiPage(topic) {
  var endpoint = 'https://en.wikipedia.org/w/api.php?'
  var reqParam = 'action=query&prop=revisions&format=json&rvprop=content&titles=';
  var reqUrl = endpoint + reqParam + encodeURI(topic);
  request(reqUrl, function(error, response, body) {
    console.log(body);
  })
}

getWikiPage('San Francisco');