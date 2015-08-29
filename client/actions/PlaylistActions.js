var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var FluxConstants = require('../constants/FluxConstants.js');
var PlaylistAPI = require('../utils/PlaylistAPI.js');

var PlaylistActions = {

  // sends playlist name to our server and dispatches created playlist info (including id)
  dispatchCreate: function(data) {
    PlaylistAPI.createPlaylist(data)
    .then(function(playlist) {
      AppDispatcher.handleViewAction({
        actionType: FluxConstants.PLAYLIST_EDITED,
        data: playlist
      });
    })
    .catch(function() {
      AppDispatcher.handleViewAction({
        actionType: FluxConstants.ERROR,
        error: 'bad req'
      });
    });
  },

  // sends API request to add articles to playlist and dispatches updated playlist information
  dispatchEdit: function(text, playlistId) {
    PlaylistAPI.addItem(text, playlistId)
    .then(function(playlist) {
      AppDispatcher.handleViewAction({
        actionType: FluxConstants.PLAYLIST_EDITED,
        data: playlist
      });
    })
    .catch(function() {
      AppDispatcher.handleViewAction({
        actionType: FluxConstants.ERROR,
        error: 'bad req'
      });
    });
  },

  // sends request to get playlist information and dispatches
  dispatchLoad: function(playlistId) {
    PlaylistAPI.getPlaylistItems(playlistId)
    .then(function(playlist) {
      AppDispatcher.handleViewAction({
        actionType: FluxConstants.PLAYLIST_EDITED,
        data: playlist
      });
    })
    .catch(function() {
      AppDispatcher.handleViewAction({
        actionType: FluxConstants.ERROR,
        error: 'bad req'
      });
    });
  },

  // dispatches that a playlist has been opened
  dispatchViewing: function(data) {
    AppDispatcher.handleViewAction({
      actionType: FluxConstants.PLAYLIST_VIEWING,
      data: data
    });
  },

  // dispatches that a playlist has been closed
  dispatchClose: function() {
    AppDispatcher.handleViewAction({
      actionType: FluxConstants.PLAYLIST_CLOSED
    });
  },

  // dispatches that a command has come to navigate through a playlist
  dispatchNav: function(data) {
    AppDispatcher.handleViewAction({
      actionType: FluxConstants.PLAYLIST_NAV,
      data: data
    });
  }
};

module.exports = PlaylistActions;
