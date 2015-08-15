var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var FluxConstants = require('../constants/FluxConstants.js');

var PlaylistActions = {

  dispatchPlaylistCreation: function(data) {
    console.log('PlaylistActions.js: displatching playlist', data);
    AppDispatcher.dispatch({
      actionType: FluxConstants.PLAYLIST_CREATED,
      data: data
    });
  }
};

module.exports = PlaylistActions;
