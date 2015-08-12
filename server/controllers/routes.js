var express = require('express');
var router = express.Router();
module.exports = router;

var landing = require('./landing');
var auth = require('./auth');
var wiki = require('./wiki');
var comments = require('./comments');
var likes = require('./likes');
// ---------------------------------------------------------------------------

router.use('/', landing);
router.use('/', auth);
router.use('/wiki', wiki);
router.use('/comments', comments);
router.use('/likes', likes);

// ---------------------------------------------------------------------------

// Placeholder user welcome
router.get('/greet', function(req, res) {
  res.render('greet');
});
