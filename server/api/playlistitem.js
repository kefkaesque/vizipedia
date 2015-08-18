var express = require('express');
var router = express.Router();
module.exports = router;

var Playlist = require('../models/Playlist.js');
var PlaylistItem = require('../models/PlaylistItem.js');

//router.get('/', function(req, res) {
//});

router.post('/', function(req, res) {
  var playlistId = req.body.playlistId;
  var topic = req.body.topic;

  if(req.user)
    addPlaylistItem(playlistId, topic)
    .then(function(playlist) {
      res.send(JSON.stringify(playlist));
    });
  else
    res.send(403);
});

// --------------------------------------------------------------------------------

function addPlaylistItem(playlistId, topic) {
  return PlaylistItem.create({playlistId: playlistId, topic: topic})
  .then(function() {
    return Playlist.findOne({
      where: {id: playlistId},
      include: [PlaylistItem]
    });
  });
};
