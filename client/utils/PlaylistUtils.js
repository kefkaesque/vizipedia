var PlaylistActions = require('../actions/PlaylistActions');
var $ = require('jquery');

var data = {
  items: []
}; //dummy data

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
    //send post request here
    data.items.push({title: item});
    // POST: 'playlist/edit', data: playlistId, playlistItem
    PlaylistActions.dispatchEdit(data);
  }
};
