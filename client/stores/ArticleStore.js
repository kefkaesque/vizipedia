var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var FluxConstants = require('../constants/FluxConstants');

var _ = require('underscore');

var article = {};
function loadData(data) {
  article = data;
}
function loadRecData(data) {
  article.recs = data;
}
var ArticleStore = _.extend({}, EventEmitter.prototype, {

  getData: function() {
    return article;
  },
  emitChange: function() {
    this.emit('change');
  },
  addChangeListener: function(callback) {
    this.on('change', callback);
  },
  removeChangeListener: function(callback) {
    this.removeListener('change', callback);
  }
});

AppDispatcher.register(function(action) {
  var text;
  switch(action.actionType) {
    case FluxConstants.VIZI_SEARCH:
      loadData(action.data);
      break;
    case FluxConstants.UPDATE_REC:
      loadRecData(action.data);
      break;
    default:
      // none
  }
  ArticleStore.emitChange();
});

module.exports = ArticleStore;
