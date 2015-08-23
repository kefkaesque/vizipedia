var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var FluxConstants = require('../constants/FluxConstants.js');
var RaceAPI = require('../utils/RaceAPI.js');

var RaceActions = {

  createAndDispatch: function(data) {
    RaceAPI.postRace(data)
    .then(function(race) {
      console.log('createAndDispatch: ', race);
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
    })
  },

  finishAndDispatch: function(data) {
    RaceAPI.postFinish(data)
    .then(function(race) {
      console.log('finishAndDispatch: ', race);
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
    })
  },

  getRaceDataAndDispatch: function(data) {
    RaceAPI.getRaceData(data)
    .then(function(race) {
      console.log('getRaceData: ', race);
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
    console.log('startAndDispatch: ', data);
    AppDispatcher.handleViewAction({
      actionType: FluxConstants.RACE_STARTED,
      data: data
    });
  }
};

module.exports = RaceActions;
