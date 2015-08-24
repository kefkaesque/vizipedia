var express = require('express');
var router = express.Router();
module.exports = router;

var landing = require('./routes/landing');
var auth = require('./routes/auth');

// ---------------------------------------------------------------------------

router.get('/mockup', function(req, res) {
  res.render('mockup');
});

router.use('/', landing);
router.use('/', auth);
router.use('/feed', landing);
router.use('/profile/:username', landing);
router.use('/wiki/:article', landing);
router.use('/race/:raceId', landing);

// ---------------------------------------------------------------------------

var recommend = require('./api/recommend');
var playlist = require('./api/playlist');
var playlistItem = require('./api/playlistitem');
var race = require('./api/race');
var feed = require('./api/feed');
var wiki = require('./api/wiki');
var profile = require('./api/profile');

// ---------------------------------------------------------------------------

router.use('/api/wiki', wiki);
router.use('/api/profile', profile);
router.use('/api/playlist', playlist);
router.use('/api/playlistitem', playlistItem);
router.use('/api/recommend', recommend);
router.use('/api/race', race);
router.use('/api/feed', feed);
