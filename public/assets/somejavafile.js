var recommend = function(articleId) {
  $.get('/likes/' + articleId, function(numLiked) {
    console.log("num of liked: ", numLiked);
    $('.likeCount').text(numLiked);
  });

};

