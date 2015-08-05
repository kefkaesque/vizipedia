var express = require('express');
var router = express.Router();

var wikiServices = require('./wikiServices');

// ---------------------------------------------------------------------------
// ROUTES
router.use('/wikiServices', wikiServices);

module.exports = router;
