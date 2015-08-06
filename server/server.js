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

// --------------------------------------------------------------------------------

app.use(express.static("public"));

app.use('/', routes);
app.listen(configEnv.serverPort, function(){console.log("Server started: listening...");});
