var express = require('express');
var app = express.Router();
module.exports = app;

// Set up local user variables
app.use(function(req, res, next) {
  res.locals.user = {};
  if(req.user) {
    res.locals.username = req.user.username;
    res.locals.user.username = req.user.username;
  }
  next();
});
