var Sequelize = require('sequelize');
var db = require('../config/postgres');

var Playlist = require('./Playlist');

var schema = {
  playlistId: {type: Sequelize.INTEGER},
  name: {type: Sequelize.STRING}
};

// --------------------------------------------------------------------------------

var PlaylistItem = db.define('playlistitem', schema);
Playlist.hasMany(PlaylistItem, {foreignKey: "playlistId"});
PlaylistItem.belongsTo(Playlist, {foreignKey: "playlistId"})

db.sync();
module.exports = PlaylistItem;
