//require dispatcher
var Dispatcher = require('../dispatcher/Dispatcher');
//require constants
var Constants = require('../constants/ProfileConstants')

var ProfileActions = {
  loadData: function() {
    Dispatcher.dispatch({
      actionType: Constants.PROFILE_LOAD_DATA
    });
  }
};

module.exports = ProfileActions;
