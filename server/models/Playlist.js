var Sequelize = require('sequelize');
var db = require('../config/postgres');
var User = require('./User');

var schema = {
  userId: {type: Sequelize.INTEGER},
  name: {type: Sequelize.STRING}
};

// --------------------------------------------------------------------------------

var Playlist = db.define('playlist', schema);

Playlist.belongsTo(User, {foreignKey: "userId"});
User.hasMany(Playlist, {foreignKey: "userId"});

db.sync();
module.exports = Playlist;
