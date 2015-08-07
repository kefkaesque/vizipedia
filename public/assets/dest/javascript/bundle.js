var express = require('express');
var passport = require('passport');

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var app = express();

var configEnv = require('./config/env.js');
var configPassport = require('./config/passport.js');
var routes = require("./controllers/routes.js");

// --------------------------------------------------------------------------------

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
  secret: 'Ark, don\'t eat that pie.',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.set("views", "server/views");
app.set("view engine", "jade");

// --------------------------------------------------------------------------------

app.use(express.static("public"));

app.use('/', routes);
app.listen(configEnv.serverPort, function(){console.log("Server started: listening...");});

module.exports = {
    serverPort: process.env.PORT || "8000"
};

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
    console.log("attempting log with "+username+" "+password+" "+email);
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
    console.log("attempting log with "+username+" "+password);
    done(null,false);
    // TODO: fetch user from database
    // TODO: validate user password
  }
));

var Sequelize = require('sequelize');
module.exports = new Sequelize(process.env.DATABASE_URL || 'sqlite://viziDb.sqlite');



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
    successRedirect: "/",
    failureRedirect: "/login"
  }
));

router.post('/signup', passport.authenticate(
  'signup', {
    successRedirect: "/",
    failureRedirect: "/signup"
  }
));

var express = require('express');
var router = express.Router();

var wiki = require('./wiki');
var auth = require('./auth');

// ---------------------------------------------------------------------------

router.use('/', auth);
router.use('/wiki', wiki);

module.exports = router;

var express = require('express');
var router = express.Router();
var request = require('request');
module.exports = router;

router.get('/:topic', function(req, res) {
  getWikiPage(req.params.topic, function(data) {
    console.log("ein");
    res.locals.article = data;
    res.render("article");
  });
});

function getWikiPage(topic, cb) {
  var endpoint = 'https://en.wikipedia.org/w/api.php?';
  var reqParam = 'action=parse&format=json&page=' + encodeURI(topic) + '&prop=text';
  var reqUrl = endpoint + reqParam;
  request(reqUrl, function(error, response, body) {
    cb(JSON.parse(body).parse.text['*']);
  });
}


var Sequelize = require('sequelize');
var db = require('../config/postgres.js');

var schema = {
  username: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  }
};

var classMethods = {};

classMethods.login = function(username, password) {
  return User.findOne({
    where: {
      username: username
    }
  })
  .then(function(user) {
    if(user.usesPassword(password)) {
      return user;
    }
    return false;
  });
};

classMethods.signup = function(username, password, email) {
  if(!isValidUsername)
      return false;
  if(!isValidPassword)
      return false;
  if(!isValidEmail)
      return false;
  return User.findOne({
    where: {
      username: username
    }
  })
  .then(function(user) {
    if(user) {
      return user;
    }
    return User.findOne({
      where: {
        username: username
      }
    });
  })
  .then(function(user) {
    if(user) {
      return false;
    }
    return User.create({username: username, password: password, email: email})
    .then(function(user){
      return user;
    });
  });
}

// --------------------------------------------------------------------------------

var instanceMethods = {};

instanceMethods.usesPassword = function(password) {
  return this.password === password;
};

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

var User = db.define('user', schema, {classMethods: classMethods, instanceMethods: instanceMethods});

db.sync();
module.exports = User;

var Sequelize = require('sequelize');
var db = require('../config/postgres.js');

var wikiArticle = db.define('wikiarticle', {
  title: {
    type: Sequelize.STRING
  },
  content: {
    type: Sequelize.STRING
  }
});

db.sync();
module.exports = wikiArticle;


//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZlci5qcyIsImNvbmZpZy9lbnYuanMiLCJjb25maWcvcGFzc3BvcnQuanMiLCJjb25maWcvcG9zdGdyZXMuanMiLCJjb250cm9sbGVycy9hdXRoLmpzIiwiY29udHJvbGxlcnMvcm91dGVzLmpzIiwiY29udHJvbGxlcnMvd2lraS5qcyIsIm1vZGVscy91c2VyLmpzIiwibW9kZWxzL3dpa2lBcnRpY2xlLmpzIiwiYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDMUZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2RBIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBleHByZXNzID0gcmVxdWlyZSgnZXhwcmVzcycpO1xudmFyIHBhc3Nwb3J0ID0gcmVxdWlyZSgncGFzc3BvcnQnKTtcblxudmFyIGJvZHlQYXJzZXIgPSByZXF1aXJlKCdib2R5LXBhcnNlcicpO1xudmFyIGNvb2tpZVBhcnNlciA9IHJlcXVpcmUoJ2Nvb2tpZS1wYXJzZXInKTtcbnZhciBzZXNzaW9uID0gcmVxdWlyZSgnZXhwcmVzcy1zZXNzaW9uJyk7XG52YXIgYXBwID0gZXhwcmVzcygpO1xuXG52YXIgY29uZmlnRW52ID0gcmVxdWlyZSgnLi9jb25maWcvZW52LmpzJyk7XG52YXIgY29uZmlnUGFzc3BvcnQgPSByZXF1aXJlKCcuL2NvbmZpZy9wYXNzcG9ydC5qcycpO1xudmFyIHJvdXRlcyA9IHJlcXVpcmUoXCIuL2NvbnRyb2xsZXJzL3JvdXRlcy5qc1wiKTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuYXBwLnVzZShib2R5UGFyc2VyLnVybGVuY29kZWQoeyBleHRlbmRlZDogdHJ1ZSB9KSk7XG5hcHAudXNlKGJvZHlQYXJzZXIuanNvbigpKTtcbmFwcC51c2UoY29va2llUGFyc2VyKCkpO1xuYXBwLnVzZShzZXNzaW9uKHtcbiAgc2VjcmV0OiAnQXJrLCBkb25cXCd0IGVhdCB0aGF0IHBpZS4nLFxuICByZXNhdmU6IHRydWUsXG4gIHNhdmVVbmluaXRpYWxpemVkOiB0cnVlXG59KSk7XG5hcHAudXNlKHBhc3Nwb3J0LmluaXRpYWxpemUoKSk7XG5hcHAudXNlKHBhc3Nwb3J0LnNlc3Npb24oKSk7XG5hcHAuc2V0KFwidmlld3NcIiwgXCJzZXJ2ZXIvdmlld3NcIik7XG5hcHAuc2V0KFwidmlldyBlbmdpbmVcIiwgXCJqYWRlXCIpO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5hcHAudXNlKGV4cHJlc3Muc3RhdGljKFwicHVibGljXCIpKTtcblxuYXBwLnVzZSgnLycsIHJvdXRlcyk7XG5hcHAubGlzdGVuKGNvbmZpZ0Vudi5zZXJ2ZXJQb3J0LCBmdW5jdGlvbigpe2NvbnNvbGUubG9nKFwiU2VydmVyIHN0YXJ0ZWQ6IGxpc3RlbmluZy4uLlwiKTt9KTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHNlcnZlclBvcnQ6IHByb2Nlc3MuZW52LlBPUlQgfHwgXCI4MDAwXCJcbn07XG4iLCJ2YXIgcGFzc3BvcnQgPSByZXF1aXJlKFwicGFzc3BvcnRcIik7XG52YXIgTG9jYWxTdHJhdGVneSA9IHJlcXVpcmUoXCJwYXNzcG9ydC1sb2NhbFwiKS5TdHJhdGVneTtcbnZhciBVc2VyID0gbnVsbDtcblxucGFzc3BvcnQuc2VyaWFsaXplVXNlcihmdW5jdGlvbih1c2VyLCBkb25lKSB7XG4gIGRvbmUobnVsbCwgdXNlci5pZCk7XG59KTtcblxucGFzc3BvcnQuZGVzZXJpYWxpemVVc2VyKGZ1bmN0aW9uKGlkLCBkb25lKSB7XG4gIC8vIFRPRE86IGZldGNoIHVzZXIgZnJvbSBkYXRhYmFzZVxuICBkb25lKG51bGwsIG51bGwpO1xufSk7XG5cbnBhc3Nwb3J0LnVzZShcInNpZ251cFwiLFxuICBuZXcgTG9jYWxTdHJhdGVneSh7cGFzc1JlcVRvQ2FsbGJhY2s6IHRydWV9LFxuICBmdW5jdGlvbihyZXEsIHVzZXJuYW1lLCBwYXNzd29yZCwgZG9uZSkge1xuICAgIHZhciBlbWFpbCA9IHJlcS5ib2R5LmVtYWlsO1xuICAgIGNvbnNvbGUubG9nKFwiYXR0ZW1wdGluZyBsb2cgd2l0aCBcIit1c2VybmFtZStcIiBcIitwYXNzd29yZCtcIiBcIitlbWFpbCk7XG4gICAgLy8gVE9ETzogY2hlY2sgaWYgdXNlciBleGlzdHNcbiAgICAvLyBUT0RPOiBjaGVjayBpZiBlbWFpbCBleGlzdHNcbiAgICAvLyBUT0RPOiBjcmVhdGUgbmV3IHVzZXJcbiAgICAvLyBUT0RPOiBjaGVjayBpZiBkYXRhYmFzZSB0aHJvd3MgZXJyb3JzXG4gICAgLy8gVE9ETzogdXNlIHByb21pc2VzXG4gIH1cbikpO1xuXG5wYXNzcG9ydC51c2UoXCJsb2dpblwiLFxuICBuZXcgTG9jYWxTdHJhdGVneSh7cGFzc1JlcVRvQ2FsbGJhY2s6IHRydWV9LFxuICBmdW5jdGlvbihyZXEsIHVzZXJuYW1lLCBwYXNzd29yZCwgZG9uZSkge1xuICAgIGNvbnNvbGUubG9nKFwiYXR0ZW1wdGluZyBsb2cgd2l0aCBcIit1c2VybmFtZStcIiBcIitwYXNzd29yZCk7XG4gICAgZG9uZShudWxsLGZhbHNlKTtcbiAgICAvLyBUT0RPOiBmZXRjaCB1c2VyIGZyb20gZGF0YWJhc2VcbiAgICAvLyBUT0RPOiB2YWxpZGF0ZSB1c2VyIHBhc3N3b3JkXG4gIH1cbikpO1xuIiwidmFyIFNlcXVlbGl6ZSA9IHJlcXVpcmUoJ3NlcXVlbGl6ZScpO1xubW9kdWxlLmV4cG9ydHMgPSBuZXcgU2VxdWVsaXplKHByb2Nlc3MuZW52LkRBVEFCQVNFX1VSTCB8fCAnc3FsaXRlOi8vdml6aURiLnNxbGl0ZScpO1xuXG5cbiIsInZhciBwYXNzcG9ydCA9IHJlcXVpcmUoJ3Bhc3Nwb3J0Jyk7XG52YXIgZXhwcmVzcyA9IHJlcXVpcmUoJ2V4cHJlc3MnKTtcbnZhciByb3V0ZXIgPSBleHByZXNzLlJvdXRlcigpO1xubW9kdWxlLmV4cG9ydHMgPSByb3V0ZXI7XG5cbnJvdXRlci5nZXQoJy9sb2dpbicsIGZ1bmN0aW9uKHJlcSwgcmVzKSB7XG4gIHJlcy5yZW5kZXIoXCJsb2dpblwiKTtcbn0pO1xuXG5yb3V0ZXIuZ2V0KCcvc2lnbnVwJywgZnVuY3Rpb24ocmVxLCByZXMpIHtcbiAgcmVzLnJlbmRlcihcInNpZ251cFwiKTtcbn0pO1xuXG5yb3V0ZXIucG9zdCgnL2xvZ2luJywgcGFzc3BvcnQuYXV0aGVudGljYXRlKFxuICAnbG9naW4nLCB7XG4gICAgc3VjY2Vzc1JlZGlyZWN0OiBcIi9cIixcbiAgICBmYWlsdXJlUmVkaXJlY3Q6IFwiL2xvZ2luXCJcbiAgfVxuKSk7XG5cbnJvdXRlci5wb3N0KCcvc2lnbnVwJywgcGFzc3BvcnQuYXV0aGVudGljYXRlKFxuICAnc2lnbnVwJywge1xuICAgIHN1Y2Nlc3NSZWRpcmVjdDogXCIvXCIsXG4gICAgZmFpbHVyZVJlZGlyZWN0OiBcIi9zaWdudXBcIlxuICB9XG4pKTtcbiIsInZhciBleHByZXNzID0gcmVxdWlyZSgnZXhwcmVzcycpO1xudmFyIHJvdXRlciA9IGV4cHJlc3MuUm91dGVyKCk7XG5cbnZhciB3aWtpID0gcmVxdWlyZSgnLi93aWtpJyk7XG52YXIgYXV0aCA9IHJlcXVpcmUoJy4vYXV0aCcpO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxucm91dGVyLnVzZSgnLycsIGF1dGgpO1xucm91dGVyLnVzZSgnL3dpa2knLCB3aWtpKTtcblxubW9kdWxlLmV4cG9ydHMgPSByb3V0ZXI7XG4iLCJ2YXIgZXhwcmVzcyA9IHJlcXVpcmUoJ2V4cHJlc3MnKTtcbnZhciByb3V0ZXIgPSBleHByZXNzLlJvdXRlcigpO1xudmFyIHJlcXVlc3QgPSByZXF1aXJlKCdyZXF1ZXN0Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJvdXRlcjtcblxucm91dGVyLmdldCgnLzp0b3BpYycsIGZ1bmN0aW9uKHJlcSwgcmVzKSB7XG4gIGdldFdpa2lQYWdlKHJlcS5wYXJhbXMudG9waWMsIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICBjb25zb2xlLmxvZyhcImVpblwiKTtcbiAgICByZXMubG9jYWxzLmFydGljbGUgPSBkYXRhO1xuICAgIHJlcy5yZW5kZXIoXCJhcnRpY2xlXCIpO1xuICB9KTtcbn0pO1xuXG5mdW5jdGlvbiBnZXRXaWtpUGFnZSh0b3BpYywgY2IpIHtcbiAgdmFyIGVuZHBvaW50ID0gJ2h0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93L2FwaS5waHA/JztcbiAgdmFyIHJlcVBhcmFtID0gJ2FjdGlvbj1wYXJzZSZmb3JtYXQ9anNvbiZwYWdlPScgKyBlbmNvZGVVUkkodG9waWMpICsgJyZwcm9wPXRleHQnO1xuICB2YXIgcmVxVXJsID0gZW5kcG9pbnQgKyByZXFQYXJhbTtcbiAgcmVxdWVzdChyZXFVcmwsIGZ1bmN0aW9uKGVycm9yLCByZXNwb25zZSwgYm9keSkge1xuICAgIGNiKEpTT04ucGFyc2UoYm9keSkucGFyc2UudGV4dFsnKiddKTtcbiAgfSk7XG59XG5cbiIsInZhciBTZXF1ZWxpemUgPSByZXF1aXJlKCdzZXF1ZWxpemUnKTtcbnZhciBkYiA9IHJlcXVpcmUoJy4uL2NvbmZpZy9wb3N0Z3Jlcy5qcycpO1xuXG52YXIgc2NoZW1hID0ge1xuICB1c2VybmFtZToge1xuICAgIHR5cGU6IFNlcXVlbGl6ZS5TVFJJTkdcbiAgfSxcbiAgZW1haWw6IHtcbiAgICB0eXBlOiBTZXF1ZWxpemUuU1RSSU5HXG4gIH0sXG4gIHBhc3N3b3JkOiB7XG4gICAgdHlwZTogU2VxdWVsaXplLlNUUklOR1xuICB9XG59O1xuXG52YXIgY2xhc3NNZXRob2RzID0ge307XG5cbmNsYXNzTWV0aG9kcy5sb2dpbiA9IGZ1bmN0aW9uKHVzZXJuYW1lLCBwYXNzd29yZCkge1xuICByZXR1cm4gVXNlci5maW5kT25lKHtcbiAgICB3aGVyZToge1xuICAgICAgdXNlcm5hbWU6IHVzZXJuYW1lXG4gICAgfVxuICB9KVxuICAudGhlbihmdW5jdGlvbih1c2VyKSB7XG4gICAgaWYodXNlci51c2VzUGFzc3dvcmQocGFzc3dvcmQpKSB7XG4gICAgICByZXR1cm4gdXNlcjtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9KTtcbn07XG5cbmNsYXNzTWV0aG9kcy5zaWdudXAgPSBmdW5jdGlvbih1c2VybmFtZSwgcGFzc3dvcmQsIGVtYWlsKSB7XG4gIGlmKCFpc1ZhbGlkVXNlcm5hbWUpXG4gICAgICByZXR1cm4gZmFsc2U7XG4gIGlmKCFpc1ZhbGlkUGFzc3dvcmQpXG4gICAgICByZXR1cm4gZmFsc2U7XG4gIGlmKCFpc1ZhbGlkRW1haWwpXG4gICAgICByZXR1cm4gZmFsc2U7XG4gIHJldHVybiBVc2VyLmZpbmRPbmUoe1xuICAgIHdoZXJlOiB7XG4gICAgICB1c2VybmFtZTogdXNlcm5hbWVcbiAgICB9XG4gIH0pXG4gIC50aGVuKGZ1bmN0aW9uKHVzZXIpIHtcbiAgICBpZih1c2VyKSB7XG4gICAgICByZXR1cm4gdXNlcjtcbiAgICB9XG4gICAgcmV0dXJuIFVzZXIuZmluZE9uZSh7XG4gICAgICB3aGVyZToge1xuICAgICAgICB1c2VybmFtZTogdXNlcm5hbWVcbiAgICAgIH1cbiAgICB9KTtcbiAgfSlcbiAgLnRoZW4oZnVuY3Rpb24odXNlcikge1xuICAgIGlmKHVzZXIpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIFVzZXIuY3JlYXRlKHt1c2VybmFtZTogdXNlcm5hbWUsIHBhc3N3b3JkOiBwYXNzd29yZCwgZW1haWw6IGVtYWlsfSlcbiAgICAudGhlbihmdW5jdGlvbih1c2VyKXtcbiAgICAgIHJldHVybiB1c2VyO1xuICAgIH0pO1xuICB9KTtcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxudmFyIGluc3RhbmNlTWV0aG9kcyA9IHt9O1xuXG5pbnN0YW5jZU1ldGhvZHMudXNlc1Bhc3N3b3JkID0gZnVuY3Rpb24ocGFzc3dvcmQpIHtcbiAgcmV0dXJuIHRoaXMucGFzc3dvcmQgPT09IHBhc3N3b3JkO1xufTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuZnVuY3Rpb24gaXNWYWxpZFVzZXJuYW1lKHVzZXJuYW1lKSB7XG4gIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBpc1ZhbGlkUGFzc3dvcmQocGFzc3dvcmQpIHtcbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIGlzVmFsaWRFbWFpbChlbWFpbCkge1xuICByZXR1cm4gdHJ1ZTtcbn1cblxudmFyIFVzZXIgPSBkYi5kZWZpbmUoJ3VzZXInLCBzY2hlbWEsIHtjbGFzc01ldGhvZHM6IGNsYXNzTWV0aG9kcywgaW5zdGFuY2VNZXRob2RzOiBpbnN0YW5jZU1ldGhvZHN9KTtcblxuZGIuc3luYygpO1xubW9kdWxlLmV4cG9ydHMgPSBVc2VyO1xuIiwidmFyIFNlcXVlbGl6ZSA9IHJlcXVpcmUoJ3NlcXVlbGl6ZScpO1xudmFyIGRiID0gcmVxdWlyZSgnLi4vY29uZmlnL3Bvc3RncmVzLmpzJyk7XG5cbnZhciB3aWtpQXJ0aWNsZSA9IGRiLmRlZmluZSgnd2lraWFydGljbGUnLCB7XG4gIHRpdGxlOiB7XG4gICAgdHlwZTogU2VxdWVsaXplLlNUUklOR1xuICB9LFxuICBjb250ZW50OiB7XG4gICAgdHlwZTogU2VxdWVsaXplLlNUUklOR1xuICB9XG59KTtcblxuZGIuc3luYygpO1xubW9kdWxlLmV4cG9ydHMgPSB3aWtpQXJ0aWNsZTtcbiIsIiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==