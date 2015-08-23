var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var FluxConstants = require('../constants/FluxConstants');

var _ = require('underscore');

var raceData = {
  articlePath: []
};

function setRaceStart(data) {
  raceData.racing = data.racing;
}

function loadRaceCreate(data) {
  raceData.start = data.start;
  raceData.end = data.end;
  raceData.raceId = data.id;
}

function setCurrentArticle(data) {
  raceData.currentArticle = data.title;
  raceData.articlePath.push(data.title);
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

AppDispatcher.register(function(payload) {
  var action = payload.action;
  switch(action.actionType) {
    case FluxConstants.RACE_STARTED:
      setRaceStart(action.data);
      break;
    case FluxConstants.RACE_CREATED:
      loadRaceCreate(action.data);
      break;
    case FluxConstants.RACE_FINISHED:
      //don't need to do anything?
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
