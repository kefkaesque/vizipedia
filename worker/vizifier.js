module.exports.vizify = run;
function run(article, title, callback) {
  if(article == '')
    return callback('');
  article = addTitle(article, title);
  addImages(article, title, function(article) {
    callback(article);
  });
}

// --------------------------------------------------------------------------------

function addTitle(article, title) {
  return "<h1>"+title+"</h1>"+article;
}

function addImages(article, title, callback) {
  // TODO: add images to article
  callback(article);
}
