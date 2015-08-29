var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var FluxConstants = require('../constants/FluxConstants');
var assign = require('object-assign');

var article = {};
function loadData(data) {
  article = data;
}
function loadRecData(data) {
  article.recs = data;
}
var ArticleStore = assign({}, EventEmitter.prototype, {

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

AppDispatcher.register(function(payload) {
  var action = payload.action;
  switch(action.actionType) {
    case FluxConstants.VIZI_SEARCH:
      loadData(action.data);
      break;
    case FluxConstants.GET_REC:
      loadRecData(action.data);
      break;
    default:
      // none
  }
  ArticleStore.emitChange();
});

module.exports = ArticleStore;
