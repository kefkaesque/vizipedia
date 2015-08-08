var passport = require('passport');
var express = require('express');
var router = express.Router();
module.exports = router;

router.get('/', function(req, res) {
  res.render("landing");
});

router.post('/', function(req, res) {
  res.redirect("/wiki/"+req.body.topic);
});
