var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var FluxConstants = require('../constants/FluxConstants');

var _ = require('underscore');

var feed = {};
function loadData(data) {
  feed = data;
}

var FeedStore = _.extend({}, EventEmitter.prototype, {

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

AppDispatcher.register(function(action) {
  var text;
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
