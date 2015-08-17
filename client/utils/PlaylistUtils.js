var PlaylistActions = require('../actions/PlaylistActions');
var $ = require('jquery');

var data = {}; //dummy data

module.exports = {

  createPlaylist: function(playlistName, callback) {
    data.playlistName = playlistName;
    data.playlistId = 1337;
    data.items = [];

    //send post request here
    // POST: 'playlist/create', data: playlistName
    // response: data: {playlistName:...,playlistId:...,items: [{title:...}]}
    PlaylistActions.dispatchEdit(data);
    callback(data);
  },

  addItem: function(item, playlistId) {
    //send post request here
    data.items.push({title: item});
    // POST: 'playlist/edit', data: playlistId, playlistItem
    PlaylistActions.dispatchEdit(data);
  }
};
