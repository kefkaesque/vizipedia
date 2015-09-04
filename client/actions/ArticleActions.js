var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var FluxConstants = require('../constants/FluxConstants.js');
var WikiAPI = require('../utils/WikiAPI.js');

var ArticleActions = {

  // sends API request with topic to our server and dispatches returned article data
  dispatchArticle: function(topic) {
    WikiAPI.getArticleData(topic)
    .then(function(article) {
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
  },

  // sends API request with topic to our server, receives corresponding article title, and dispatches
  dispatchQuery: function(topic) {
    return WikiAPI.getArticleQuery(topic)
    .then(function(query) {
      AppDispatcher.handleViewAction({
        actionType: FluxConstants.QUERY,
        data: query
      });
      return query;
    });
  },

  dispatchAutoComplete: function(topic) {
    WikiAPI.getAutoComplete(topic)
    .then(function(topics) {
      AppDispatcher.handleViewAction({
        actionType: FluxConstants.AUTO_COMPLETE,
        data: topics
      });
    });
  },

  dispatchHeaderComplete: function(topic) {
    WikiAPI.getAutoComplete(topic)
    .then(function(topics) {
      AppDispatcher.handleViewAction({
        actionType: FluxConstants.HEADER_COMPLETE,
        data: topics
      });
    });
  },

  dispatchClearHeader: function() {
    AppDispatcher.handleViewAction({
      actionType: FluxConstants.HEADER_COMPLETE,
      data: ''
    });
  },

  dispatchClearLanding: function() {
    AppDispatcher.handleViewAction({
      actionType: FluxConstants.AUTO_COMPLETE,
      data: ''
    });
  }
};

module.exports = ArticleActions;
