var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var FluxConstants = require('../constants/FluxConstants.js');
var WikiUtils = require('../utils/WikiUtils.js');
var Promise = require('es6-promise').Promise;
var request = require('superagent');

var ArticleActions = {

  getArticleData: function(topic) {
    return new Promise(function(resolve, reject) {
      request
        .get('/wiki/'+topic)
        .end(function(err, res) {
          if (err) {
            reject();
          } else {
            resolve(JSON.parse(res.text));
          }
        });
    });
  },
  dispatchArticle: function(topic) {
    this.getArticleData(topic)
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

  }
};

module.exports = ArticleActions;
