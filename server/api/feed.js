var express = require('express');
var router = express.Router();
var request = require('request');
var Relation = require('../models/relation.js');

module.exports = router;

router.get('/', function(req, res) {
  Relation.getFollowingRecommended(res.locals.user.id)
  .then(function(data) {
    res.send(JSON.stringify(data));
  });
});
