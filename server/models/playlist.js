var Sequelize = require('sequelize');
var db = require('../config/postgres.js');

var schema = {
  userid: {type: Sequelize.INTEGER},
  name: {type: Sequelize.STRING}
};

var classMethods = {};

classMethods.find = function(userid) {
};

// --------------------------------------------------------------------------------

var Playlist = db.define('playlist', schema, {classMethods: classMethods});
db.sync();
module.exports = Playlist;
