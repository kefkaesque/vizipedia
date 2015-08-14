//require dispatcher
var AppDispatcher = require('../dispatcher/AppDispatcher');
//require constants
var FluxConstants = require('../constants/FluxConstants');

var ProfileActions = {
  loadData: function() {
    AppDispatcher.dispatch({
      actionType: FluxConstants.PROFILE_LOAD_DATA
    });
  }
};

module.exports = ProfileActions;
