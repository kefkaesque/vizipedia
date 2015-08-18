var express = require('express');
var app = express.Router();
module.exports = app;

// Set up local user variables
app.use(function(req, res, next) {
  if(req.user) {
    res.locals.user.username = req.user.username;
    res.locals.user.id = req.user.id;
    res.locals.Locals.userid = req.user.id;
    res.locals.Locals.username = req.user.username;
  }
  next();
});
