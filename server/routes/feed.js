var express = require('express');
var router = express.Router();
var request = require('request');
module.exports = router;

var Relation = require('../models/relation.js');

router.get('/', function(req, res) {
  Relation.getFollowingRecommended()
  .then(function(data) {
    res.send(JSON.stringify(data));
  });
});
