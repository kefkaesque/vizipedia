var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var FluxConstants = require('../constants/FluxConstants');

var _ = require('underscore');

var raceData = {
  articlePath: []
};

function loadData(data) {
  console.log('raceStore loading data', data);
  raceData.racing = data.racing;
  raceData.start = data.start;
  raceData.end = data.end;
}

function loadRaceCreate(data) {
  console.log('loadRaceCreate', data);
  raceData.startId = data.startId;
  raceData.endId = data.endId;
  raceData.raceId = data.raceId;
}

function setCurrentArticle(data) {
  console.log("setCurrentArticle: ", data);
  raceData.currentArticle = data.title;
  raceData.articlePath.push(data.id); //change to title?
}

var RaceStore = _.extend({}, EventEmitter.prototype, {

  getData: function() {
    console.log('getData', raceData);
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

AppDispatcher.register(function(payload) {
  var action = payload.action;
  switch(action.actionType) {
    case FluxConstants.RACE_STARTED:
      loadData(action.data);
      break;
    case FluxConstants.RACE_CREATED:
      loadRaceCreate(action.data);
      break;
    case FluxConstants.VIZI_SEARCH:
      setCurrentArticle(action.data);
      break;
    default:
      // none
  }
  RaceStore.emitChange();
});

module.exports = RaceStore;
