var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var FluxConstants = require('../constants/FluxConstants');

var _ = require('underscore');

var rec = {};
function loadData(data) {
  rec = data;
}

var RecommendStore = _.extend({}, EventEmitter.prototype, {

  getData: function() {
    return rec;
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
    case FluxConstants.USER_RECS:
      loadData(action.data);
      break;
    case FluxConstants.UPDATE_RECS:
      loadData(action.data);
    default:
      // none
  }
  RecommendStore.emitChange();
});

module.exports = RecommendStore;
