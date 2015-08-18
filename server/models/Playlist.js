var Sequelize = require('sequelize');
var db = require('../config/postgres');

var schema = {
  userId: {type: Sequelize.INTEGER},
  name: {type: Sequelize.STRING}
};

// --------------------------------------------------------------------------------

var Playlist = db.define('playlist', schema);

db.sync();
module.exports = Playlist;
