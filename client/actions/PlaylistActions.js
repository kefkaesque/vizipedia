var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var FluxConstants = require('../constants/FluxConstants.js');
var PlaylistAPI = require('../utils/PlaylistAPI.js');

var PlaylistActions = {

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

  dispatchEdit: function(text, playlistId) {
    console.log('!!!!', text);
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

  dispatchViewing: function() {
    AppDispatcher.handleViewAction({
      actionType: FluxConstants.PLAYLIST_VIEWING
    });
  }
};

module.exports = PlaylistActions;
