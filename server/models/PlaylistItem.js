var Sequelize = require('sequelize');
var db = require('../config/postgres');

var Article = require('./WikiArticle');
var Playlist = require('./Playlist');

var schema = {
  playlistId: {type: Sequelize.INTEGER},
  articleId: {type: Sequelize.INTEGER},
  topic: {type: Sequelize.STRING}
};

// --------------------------------------------------------------------------------

var PlaylistItem = db.define('playlistitem', schema);

Playlist.hasMany(PlaylistItem, {foreignKey: "playlistId"});
PlaylistItem.belongsTo(Playlist, {foreignKey: "playlistId"});

PlaylistItem.belongsTo(Article, {foreignKey: "articleId"});
Article.hasMany(PlaylistItem, {foreignKey: "articleId"});

db.sync();
module.exports = PlaylistItem;
