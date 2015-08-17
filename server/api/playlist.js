var express = require('express');
var router = express.Router();
module.exports = router;

var Playlist = require('../models/playlist.js');

router.get('/', function(req, res) {
  var playlistId = req.query.id;
  var userId = req.query.userid;

  if(playlistId) {
    Playlist.getPlaylist(playlistId)
    .then(function(playlist) {
      res.send(JSON.stringify(playlist));
    });
  }
  else if(userId) {
    Playlist.getUserPlaylists(userId)
    .then(function(playlists) {
      res.send(JSON.stringify(playlists));
    });
  }
});


