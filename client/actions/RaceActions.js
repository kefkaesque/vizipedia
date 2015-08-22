var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var FluxConstants = require('../constants/FluxConstants.js');
var RaceAPI = require('../utils/RaceAPI.js');

var RaceActions = {

  createAndDispatch: function(data) {
    RaceAPI.postRace(data)
    .then(function(race) {
      AppDispatcher.handleViewAction({
        actionType: FluxConstants.RACING,
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
      AppDispatcher.handleViewAction({
        actionType: FluxConstants.RACING,
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
      AppDispatcher.handleViewAction({
        actionType: FluxConstants.RACING,
        data: race
      });
    })
    .catch(function() {
      AppDispatcher.handleViewAction({
        actionType: FluxConstants.ERROR,
        error: 'bad req'
      });
    });
  }
};

module.exports = RaceActions;
