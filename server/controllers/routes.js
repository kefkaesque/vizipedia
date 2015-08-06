var express = require('express');
var router = express.Router();

var wiki = require('./wiki');

// ---------------------------------------------------------------------------
// ROUTES
router.use('/wiki', wiki);

module.exports = router;
