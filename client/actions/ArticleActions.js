var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var FluxConstants = require('../constants/FluxConstants.js');
var WikiAPI = require('../utils/WikiAPI.js');

var ArticleActions = {
  dispatchArticle: function(topic) {
    WikiAPI.getArticleData(topic)
    .then(function(article) {
      console.log("ArticleActions dispatching VIZI_SEARCH");
      AppDispatcher.handleViewAction({
        actionType: FluxConstants.VIZI_SEARCH,
        data: article
      });
    })
    .catch(function() {
      AppDispatcher.handleViewAction({
        actionType: FluxConstants.ERROR,
        error: 'bad req'
      });
    });

  }
};

module.exports = ArticleActions;
