var express = require('express');
var router = express.Router();
module.exports = router;

var Article = require('../models/WikiArticle.js');
var Playlist = require('../models/Playlist.js');
var PlaylistItem = require('../models/PlaylistItem.js');

router.get('/', function(req, res) {
  var playlistId = req.query.id;
  var userId = req.query.userid;

  if(playlistId) {
    getPlaylist(playlistId)
    .then(function(result) {
      res.send(JSON.stringify(result));
    });
  }
  else if(userId) {
    getUserPlaylists(userId)
    .then(function(result) {
      res.send(JSON.stringify(result));
    });
  }
});

router.post('/', function(req, res) {
  var name = req.body.name;

  if(req.user)
    createPlaylist(name, req.user.id)
    .then(function(playlist) {
      res.send(JSON.stringify(playlist));
    });
  else
    res.send(403);
});

// --------------------------------------------------------------------------------

function getPlaylist(playlistId) {
  return Playlist.findOne({
    where: {id: playlistId},
    include: [{
      model: PlaylistItem,
      include: [Article]
    }]
  });
};

function getUserPlaylists(userId) {
  return Playlist.findAll({
    where: {userId: userId},
    include: [PlaylistItem]
  });
};

function createPlaylist(name, userId) {
  return Playlist.create({name: name, userId: userId})
  .then(function(playlist) {
    playlist.dataValues.playlistitems = [];
    return playlist;
  });
};
