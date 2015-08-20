var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var FluxConstants = require('../constants/FluxConstants.js');

var RaceActions = {

  dispatchRacing: function(data) {
    AppDispatcher.dispatch({
      actionType: FluxConstants.RACING,
      data: data
    });
  }
};

module.exports = RaceActions;
