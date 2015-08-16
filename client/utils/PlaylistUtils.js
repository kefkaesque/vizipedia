var PlaylistActions = require('../actions/PlaylistActions');
var $ = require('jquery');

module.exports = {

  createPlaylist: function(playlistName, callback) {
    //send post request here
    var data = { //dummy data
      playlistId: 1337
    };

    PlaylistActions.dispatchPlaylistCreation(data);
    callback(data);
  }
};
