var express = require('express');
var router = express.Router();
module.exports = router;

var landing = require('./landing');
var auth = require('./auth');
var wiki = require('./wiki');
var comments = require('./comments');
var recommendations = require('./recommendations');

// ---------------------------------------------------------------------------

router.use('/', landing);
router.use('/', auth);
router.use('/wiki', wiki);
router.use('/comments', comments);
router.use('/recommendations', recommendations);

// ---------------------------------------------------------------------------

// Placeholder user welcome
router.get('/greet', function(req, res) {
  res.render('greet');
});
