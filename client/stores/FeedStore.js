var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var FluxConstants = require('../constants/FluxConstants');
var assign = require('object-assign');

var feed = {};
function loadData(data) {
  feed = {data:data};
}

var FeedStore = assign({}, EventEmitter.prototype, {

  getData: function() {
    return feed;
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
    case FluxConstants.FEED_LOAD_DATA:
      loadData(action.data);
      break;
    default:
      // none
  }
  FeedStore.emitChange();
});

module.exports = FeedStore;
