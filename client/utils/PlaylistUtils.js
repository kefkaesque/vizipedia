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

  getPlaylist: function(playlistId) {
    $.ajax({
      url: '/api/playlist?id='+playlistId,
      dataType: 'json',
      success: function(data) {
        console.log("getPlaylist: ", data);
        // PlaylistActions.dispatchEdit(data);
      },
      error: function(xhr, status, err) {
        console.error('/api/playlist', status, err.toString());
      }
    });
  },

  addItem: function(topic, playlistId) {
    var playlistData = {
      topic: topic,
      playlistId: playlistId
    };

    $.ajax({
      url: '/api/playlistitem',
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
