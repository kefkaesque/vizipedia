var recommend = function(articleId) {
  $.get('/recommendations/' + articleId, function(numRecs) {
    $('.rCount').text(numRecs);
  });
};
