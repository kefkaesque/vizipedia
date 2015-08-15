var PlaylistActions = require('../actions/PlaylistActions');
var $ = require('jquery');

module.exports = {

  createPlaylist: function(playlistName) {
    console.log('PlaylistUtils.js: creating playlist');
    //send post request here
    var playlistId = 1337; //dummy data
    PlaylistActions.dispatchPlaylistCreation(playlistId);
  }
};
