var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var User = require('../models/User');

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findOne({
    where: {
      id: id
    }
  })
  .then(function(user) {
    done(null, user);
  });
});

passport.use("signup",
  new LocalStrategy({passReqToCallback: true},
  function(req, username, password, done) {
    var email = req.body.email;
    User.signup(username, password, email)
    .then(function(user) {
      done(null, user);
    });
  }
));

passport.use("login",
  new LocalStrategy({passReqToCallback: true},
  function(req, username, password, done) {
    User.login(username, password)
    .then(function(user) {
      done(null,user);
    });
  }
));
