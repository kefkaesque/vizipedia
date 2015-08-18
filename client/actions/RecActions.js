var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var FluxConstants = require('../constants/FluxConstants.js');

var FluxActions = {

  dispatchRec: function(data) {
    AppDispatcher.dispatch({
      actionType: FluxConstants.UPDATE_REC,
      data: data
    });
  }
};

module.exports = FluxActions;
