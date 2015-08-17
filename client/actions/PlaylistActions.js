var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var FluxConstants = require('../constants/FluxConstants.js');

var PlaylistActions = {

  dispatchEdit: function(data) {
    AppDispatcher.dispatch({
      actionType: FluxConstants.PLAYLIST_EDITED,
      data: data
    });
  }

};

module.exports = PlaylistActions;
