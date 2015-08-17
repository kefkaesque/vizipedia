var PlaylistActions = require('../actions/PlaylistActions');
var $ = require('jquery');

var data = {}; //dummy data

module.exports = {

  createPlaylist: function(playlistName, callback) {
    //send post request here
    data.playlistName = playlistName;
    data.playlistId = 1337;
    data.items = [];

    PlaylistActions.dispatchEdit(data);
    callback(data);
  },

  addItem: function(item, playlistId) {
    //send post request here
    data.items.push({title: item});

    PlaylistActions.dispatchEdit(data);
  }
};
