var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var FluxConstants = require('../constants/FluxConstants.js');
var RecAPI = require('../utils/RecAPI.js');

var RecActions = {
  dispatchUserRecs: function(userId) {
    RecAPI.getUserRecs(userId)
    .then(function(articles) {
      console.log('dispatch article data ', articles);
      AppDispatcher.handleViewAction({
        actionType: FluxConstants.USER_RECS,
        data: articles
      });
    })
    .catch(function() {
      AppDispatcher.handleViewAction({
        actionType: FluxConstants.ERROR,
        error: 'bad req'
      });
    });
  },
  dispatchArticleRecs: function(articleId) {
    RecAPI.getArticleRecs(articleId)
    .then(function(articles) {
      AppDispatcher.handleViewAction({
        actionType: FluxConstants.UPDATE_REC,
        data: articles
      });
    })
    .catch(function() {
      AppDispatcher.handleViewAction({
        actionType: FluxConstants.ERROR,
        error: 'bad req'
      });
    });
  },
  dispatchRec: function(articleId) {
    RecAPI.postRec(articleId)
    .then(function(articles) {
      AppDispatcher.handleViewAction({
        actionType: FluxConstants.UPDATE_REC,
        data: articles
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

module.exports = RecActions;
