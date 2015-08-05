var express = require('express');
var router = express.Router();


var wikiServices = require('./wikiServices');
// var googleServices = require('./googleServices');

// ---------------------------------------------------------------------------
// ROUTES
router.use('/wikiServices', wikiServices);
// router.use('/googleServices', otherServices); 

module.exports = router;
