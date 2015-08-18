var express = require('express');
var router = express.Router();
module.exports = router;

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
  var userid = req.body.userid;

  createPlaylist(name, userid)
  .then(function(playlist) {
    res.send(JSON.stringify(playlist));
  });
});

// --------------------------------------------------------------------------------

function getPlaylist(playlistId) {
  return Playlist.findAll({
    where: {id: playlistId},
    include: [PlaylistItem]
  })
  .then(function(playlists) {
    return playlists;
  });
};

function getUserPlaylists(userId) {
  return Playlist.findAll({
    where: {id: userId},
    include: [PlaylistItem]
  })
  .then(function(playlists) {
    return playlists;
  });
};

function createPlaylist(name, userId) {
  return Playlist.create({name: name, user_id: userId})
  .then(function(playlist) {
    playlist.items = [];
    return playlist;
  });
};
