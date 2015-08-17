var express = require('express');
var router = express.Router();
module.exports = router;

var landing = require('./routes/landing');
var auth = require('./routes/auth');
var wiki = require('./routes/wiki');
var comments = require('./routes/comments');
var recommendations = require('./routes/recommendations');
var feed = require('./routes/feed');
var profile = require('./routes/profile');

// ---------------------------------------------------------------------------

router.use('/', landing);
router.use('/', auth);
router.use('/wiki', wiki);
router.use('/comments', comments);
router.use('/recommendations', recommendations);
router.use('/feed', feed);
router.use('/profile', profile);

// ---------------------------------------------------------------------------

var apiPlaylist = require('./api/playlist');

// ---------------------------------------------------------------------------

router.use('/api/playlist', apiPlaylist);
