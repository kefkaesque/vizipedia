var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var FluxConstants = require('../constants/FluxConstants');

var _ = require('underscore');

var data = {};
function loadData(data) {
  data = data;
}

var ArticleStore = _.extend({}, EventEmitter.prototype, {

  getData: function() {
    return data;
  },

 // Emit Change event
  emitChange: function() {
    this.emit('change');
  },

  // Add change listener
  addChangeListener: function(callback) {
    this.on('change', callback);
  },

  // Remove change listener
  removeChangeListener: function(callback) {
    this.removeListener('change', callback);
  }
});

AppDispatcher.register(function(action) {
  var text;

  switch(action.actionType) {

    // Respond to RECEIVE_DATA action
    case FluxCartConstants.VIZI_SEARCH:
      loadData(action.data);
      break;

    default:
      // none
  }

  ArticleStore.emitChange();
  return true;
});

module.exports = ArticleStore;
