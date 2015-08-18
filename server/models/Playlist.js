var Sequelize = require('sequelize');
var db = require('../config/postgres');

var schema = {
  user_id: {type: Sequelize.INTEGER},
  name: {type: Sequelize.STRING}
};

// --------------------------------------------------------------------------------

var Playlist = db.define('playlist', schema);

db.sync();
module.exports = Playlist;
