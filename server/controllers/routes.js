var express = require('express');
var router = express.Router();
module.exports = router;

var wiki = require('./wiki');
var auth = require('./auth');

// ---------------------------------------------------------------------------

router.use('/', auth);
router.use('/wiki', wiki);

// ---------------------------------------------------------------------------

// Placeholder user welcome
router.get('/greet', function(req, res) {
  res.render("greet");
});
