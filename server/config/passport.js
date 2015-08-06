var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var User = null;

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  // TODO: fetch user from database
  done(null, null);
});

passport.use("signup",
  new LocalStrategy({passReqToCallback: true},
  function(req, username, password, done) {
    var email = req.body.email;
    if(!isValidUsername(username)) done(null, false);
    if(!isValidPassword(password)) done(null, false);
    if(!isValidEmail(email)) done(null, false);

    // TODO: check if user exists
    // TODO: check if email exists
    // TODO: create new user
    // TODO: check if database throws errors
    // TODO: use promises
  }
));

passport.use("login",
  new LocalStrategy({passReqToCallback: true},
  function(req, username, password, done) {
    // TODO: fetch user from database
    // TODO: validate user password
  }
));

// --------------------------------------------------------------------------------

function isValidUsername(username) {
    return true;
}

function isValidPassword(password) {
    return true;
}

function isValidEmail(email) {
    return true;
}
