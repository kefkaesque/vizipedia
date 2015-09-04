var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var FluxConstants = require('../constants/FluxConstants');
var assign = require('object-assign');

var search = {};

function loadAutoComplete(data) {
  search.topics = data;
}
function loadHeaderAutoComplete(data) {
  search.headerTopics = data;
}
var ArticleStore = assign({}, EventEmitter.prototype, {

  getData: function() {
    return search;
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
    case FluxConstants.AUTO_COMPLETE:
      loadAutoComplete(action.data);
      break;
    case FluxConstants.HEADER_COMPLETE:
      loadHeaderAutoComplete(action.data);
      break;
    default:
      // none
  }
  ArticleStore.emitChange();
});

module.exports = ArticleStore;
