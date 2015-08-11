var express = require('express');
var app = express.Router();
module.exports = app;

var userMiddleware = require('./user');

function init(req, res, next) {
  res.locals.user = {};
  res.locals.Locals = {};
  next();
}

app.use(
  init,
  userMiddleware
);
