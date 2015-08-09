module.exports.vizify = run;
function run(article, title) {
  article = addTitle(article, title);
  return article;
}

// --------------------------------------------------------------------------------

function addTitle(article, title) {
  return "<h1>"+title+"</h1>"+article;
}
