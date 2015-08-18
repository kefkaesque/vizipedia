var PlaylistActions = require('../actions/PlaylistActions');
var $ = require('jquery');

module.exports = {

  createPlaylist: function(playlistName, callback) {
    var playlistData = {
      name: playlistName
    };

    $.ajax({
      url: '/api/playlist',
      dataType: 'json',
      type: 'POST',
      data: playlistData,
      success: function(data) {
        PlaylistActions.dispatchEdit(data);
        callback(data);
      },
      error: function(xhr, status, err) {
        console.error('/api/playlist', status, err.toString());
      }
    });
  },

  addItem: function(item, playlistId) {
    var playlistData = { //May need to change depending on api
      item: item,
      playlistId: playlistId
    };

    $.ajax({
      url: '/api/playlist/edit',
      dataType: 'json',
      type: 'POST',
      data: playlistData,
      success: function(data) {
        PlaylistActions.dispatchEdit(data);
      },
      error: function(xhr, status, err) {
        console.error('/api/playlist/edit', status, err.toString());
      }
    });
  }
};
