var Sequelize = require('sequelize');
var db = require('../config/postgres.js');

var schema = {
  userid: {type: Sequelize.INTEGER},
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

classMethods.getUserPlaylists = function(userid) {
  return Playlist.findOne({
    where: {
      id: userid
    }
  });
};

classMethods.createPlaylist = function(name, userid) {
  return Playlist.create({name: name, userid: userid});
}

// --------------------------------------------------------------------------------

var Playlist = db.define('playlist', schema, {classMethods: classMethods});
db.sync();
module.exports = Playlist;
