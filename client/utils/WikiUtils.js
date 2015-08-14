var ArticleActions = require('../actions/ArticleActions');
var $ = require('jquery');

module.exports = {

  getArticleData: function(topic) {
    $.ajax({
      // add topic to url
      url: '/wiki/Cat',
      dataType: 'json',
      success: function(data) {
        console.log(data);
        ArticleActions.dispatchArticle(data);
      },
      error: function(data) {
        console.log('failed');
      }
    });

  }
};
