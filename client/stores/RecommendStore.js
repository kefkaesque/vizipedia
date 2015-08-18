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

AppDispatcher.register(function(action) {
  var text;
  switch(action.actionType) {
    case FluxConstants.UPDATE_REC:
      loadData(action.data);
      break;
    default:
      // none
  }
  RecommendStore.emitChange();
});

module.exports = RecommendStore;
