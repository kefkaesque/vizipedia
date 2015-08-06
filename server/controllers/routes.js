var express = require('express');
var router = express.Router();

var wiki = require('./wiki');
var auth = require('./auth');

// ---------------------------------------------------------------------------

router.use('/', auth);
router.use('/wiki', wiki);

module.exports = router;
