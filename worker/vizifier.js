var request = require('request');

module.exports.vizify = run;
function run(article, title, callback) {
  if(article === '')
    return callback('');
  article = addTitle(article, title);
  // console.log('article:',article);
  addImages(article, title, function(article, url) {
    callback(article, url);
  });
}

// --------------------------------------------------------------------------------

function addTitle(article, title) {
  return "<h1>"+title+"</h1>"+article;
}

function addImages(article, title, callback) {
  // TODO: add images to article
  // console.log('Adding Images!');
  var endPoint = 'http://ajax.googleapis.com/ajax/services/search/images?';
  var reqParam = 'v=1.0&q=' + encodeURI(title);
  var params = '&imgsz=huge&rsz=1';
  // var imgNum = '&rsz=8' //'rsz=[1-8]'
  var reqUrl = endPoint + reqParam + params;
  request(reqUrl, function(error, response, body) {
    var url;
    if (error) {
      // handle 404 page here.
      //     cb('');
    } else {
      body = JSON.parse(body);
      for (var i=0; i<body.responseData.results.length; i++) {
        article = '<div class="hero"><img src="' + body.responseData.results[i].url+'"></div>'+article;
        url = body.responseData.results[i].url;
      }
      // console.log('article:', article);
      callback(article, url);
    }
  });
}

