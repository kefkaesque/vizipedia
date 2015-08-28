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
  raceData.raceInfo = data;
}

function setCurrentArticle(data) {
  if(raceData.racing) {
    raceData.currentArticle = data.title;
    raceData.articlePath.push(data.title);
  }
}

function setFinishedRacers(data) {
  var raceInfo = raceData.raceInfo;
  raceData = {
    racerInfo: data,
    raceInfo: raceInfo
  }
}

function loadRaceData (data) {
  raceData.raceInfo = data.raceInfo;
  raceData.racerInfo = data.racerInfo;
}

function clearRaceData () {
  raceData = {
    articlePath: []
  };
  console.log("clear race called", raceData);
}

var RaceStore = _.extend({}, EventEmitter.prototype, {

  getData: function() {
    console.log('racestore getting data ', raceData);
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
      setFinishedRacers(action.data);
      break;
    case FluxConstants.RACE_CANCELED:
      clearRaceData();
      break;
    case FluxConstants.RACE_DATA_RETRIEVED:
      loadRaceData(action.data);
      break;
    case FluxConstants.VIZI_SEARCH:
        setCurrentArticle(action.data);
        if(raceData.racing) {
          return;
        }
      break;
    default:
      // none
  }
  RaceStore.emitChange();
  console.log('race store emitting change');
});

module.exports = RaceStore;
