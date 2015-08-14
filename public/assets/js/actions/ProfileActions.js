//require dispatcher
var AppDispatcher = require('../dispatcher/AppDispatcher');
//require constants
var FluxConstants = require('../constants/FluxConstants');

var ProfileActions = {

  dispatchProfileData: function(data) {
    AppDispatcher.dispatch({
      actionType: FluxConstants.PROFILE_LOAD_DATA,
      data: data
    });
  }

};

module.exports = ProfileActions;
