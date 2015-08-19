var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var FluxConstants = require('../constants/FluxConstants');

var _ = require('underscore');

var raceData = {};

function loadData(data) {
  console.log('raceStore loading data', data);
  raceData = data;
}

function getCurrentArticle(data) {
  console.log(data);
  raceData.currentArticle = data.id;
}

var RaceStore = _.extend({}, EventEmitter.prototype, {

  getData: function() {
    return raceData;
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
  switch(action.actionType) {
    case FluxConstants.RACING:
      loadData(action.data);
      break;
    case FluxConstants.VIZI_SEARCH:
      getCurrentArticle(action.data);
      break;
    default:
      // none
  }
  RaceStore.emitChange();
});

module.exports = RaceStore;
