var express = require('express');
var passport = require('passport');

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var app = express();

var configEnv = require('./config/env.js');
var configPassport = require('./config/passport.js');

var middleware = require('./middleware/main.js');
var routes = require('./routes.js');

var http = require('http');
var jackrabbit = require('jackrabbit');
var path = require('path');

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
app.use(middleware);

app.set('views', 'server/views');
app.set('view engine', 'jade');



// --------------------------------------------------------------------------------

app.use(express.static('public'));

app.use('/', routes);
app.listen(configEnv.serverPort, function(){console.log('Server started: listening...');});
