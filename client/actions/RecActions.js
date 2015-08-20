var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var FluxConstants = require('../constants/FluxConstants.js');
var RecAPI = require('../utils/RecAPI.js');

var RecActions = {
  dispatchUserRecs: function(userId) {
    RecAPI.getUserRecs(userId)
    .then(function(articles) {
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
    .then(function(numRec) {
      AppDispatcher.handleViewAction({
        actionType: FluxConstants.UPDATE_REC,
        data: numRec
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
        actionType: FluxConstants.MAKE_REC,
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
  dispatchUnrec: function(articleId) {
    RecAPI.unRecommend(articleId)
    .then(function(articles) {
      console.log(articles);
      AppDispatcher.handleViewAction({
        actionType: FluxConstants.MAKE_REC,
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
  dispathRecState: function(userId, articleId) {
    RecAPI.recommendState(userId, articleId)
    .then(function(articles) {
      AppDispatcher.handleViewAction({
        actionType: FluxConstants.MAKE_REC,
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

};

module.exports = RecActions;
