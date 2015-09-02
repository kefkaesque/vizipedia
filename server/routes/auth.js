var passport = require('passport');
var express = require('express');
var router = express.Router();
module.exports = router;

router.get('/login', function(req, res) {
  res.render("login");
});

router.get('/signup', function(req, res) {
  res.render("signup");
});

router.post('/login', passport.authenticate(
  'login', {
    successRedirect: "/feed",
    failureRedirect: "/login"
  }
));

router.post('/signup', passport.authenticate(
  'signup', {
    successRedirect: "/",
    failureRedirect: "/signup"
  }
));

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});
