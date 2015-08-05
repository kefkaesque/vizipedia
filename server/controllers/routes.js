var express = require('express');
var routes = express();


var wikiServices = require('./wikiServices');
// var googleServices = require('./googleServices');
module.exports = routes;

// ---------------------------------------------------------------------------
// ROUTES
routes.use('/wikiServices', wikiServices);
// router.use('/googleServices', otherServices); 

