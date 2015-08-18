var Sequelize = require('sequelize');
var db = require('../config/postgres');

var Playlist = require('./playlist');

var schema = {
  playlist_id: {type: Sequelize.INTEGER},
  name: {type: Sequelize.STRING}
};

var classMethods = {};

classMethods.getPlaylist = function(playlistId) {
  return Playlist.findOne({
    where: {
      id: playlistId
    }
  });
};

classMethods.createPlaylist = function(name, userid) {
  return Playlist.create({name: name, userid: userid});
};

// --------------------------------------------------------------------------------

var PlaylistItem = db.define('playlistitem', schema, {classMethods: classMethods});
Playlist.hasMany(PlaylistItem, {foreignKey: "playlist_id"});
PlaylistItem.belongsTo(Playlist, {foreignKey: "playlist_id"})

db.sync();
module.exports = PlaylistItem;
