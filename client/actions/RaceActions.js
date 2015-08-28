var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var FluxConstants = require('../constants/FluxConstants.js');
var RaceAPI = require('../utils/RaceAPI.js');

var RaceActions = {

  createAndDispatch: function(data) {
    return RaceAPI.postRace(data)
    .then(function(race) {
      AppDispatcher.handleViewAction({
        actionType: FluxConstants.RACE_CREATED,
        data: race
      });
    })
    .catch(function() {
      AppDispatcher.handleViewAction({
        actionType: FluxConstants.ERROR,
        error: 'bad req'
      });
    });
  },

  finishAndDispatch: function(data) {
    return RaceAPI.postFinish(data)
    .then(function(race) {
      AppDispatcher.handleViewAction({
        actionType: FluxConstants.RACE_FINISHED,
        data: race
      });
    })
    .catch(function() {
      AppDispatcher.handleViewAction({
        actionType: FluxConstants.ERROR,
        error: 'bad req'
      });
    });
  },

  getRaceDataAndDispatch: function(data) {
    return RaceAPI.getRaceData(data)
    .then(function(race) {
      AppDispatcher.handleViewAction({
        actionType: FluxConstants.RACE_DATA_RETRIEVED,
        data: race
      });
    })
    .catch(function() {
      AppDispatcher.handleViewAction({
        actionType: FluxConstants.ERROR,
        error: 'bad req'
      });
    });
  },

  startAndDispatch: function(data) {
    AppDispatcher.handleViewAction({
      actionType: FluxConstants.RACE_STARTED,
      data: data
    });
  },

  cancelRace: function() {
    AppDispatcher.handleViewAction({
      actionType: FluxConstants.RACE_CANCELED,
    });
  }
};

module.exports = RaceActions;
