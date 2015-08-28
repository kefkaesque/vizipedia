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
        actionType: FluxConstants.GET_REC,
        data: numRec.length
      });
    })
    .catch(function() {
      AppDispatcher.handleViewAction({
        actionType: FluxConstants.ERROR,
        error: 'bad req'
      });
    });
  },
  dispatchAllRecs: function(articleId) {
    RecAPI.getArticleRecs(articleId)
    .then(function(numRec) {
      AppDispatcher.handleViewAction({
        actionType: FluxConstants.GET_ALL,
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
      AppDispatcher.handleViewAction({
        actionType: FluxConstants.UN_REC,
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
  dispatchRecState: function(userId, articleId) {
    return RecAPI.recommendState(userId, articleId)
    .then(function(articles) {
      AppDispatcher.handleViewAction({
        actionType: FluxConstants.STATE,
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
