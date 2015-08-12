var express = require('express');
var router = express.Router();
var request = require('request');
module.exports = router;

var amqp = require('amqplib');
var when = require('when');
var uuid = require('node-uuid');
var WikiArticle = require('../models/wikiArticle.js');
var VisitedArticle = require('../models/visitedArticle.js');
var configEnv = require('../config/env.js');

router.get('/:articleId', function(req, res) {
  console.log(res.locals.user.id);
  console.log(req.params.articleId);
  if (!res.locals.user.id) {
    //redirect to login if user tries to recommend without being loggedin

  }
  VisitedArticle.toggleLike(res.locals.user.id, req.params.articleId)
  .then(function() {
    return VisitedArticle.numLiked(req.params.articleId);
  })
  .then(function(result) {
    console.log('likes.js, ', result);
    res.send(result + '');
  });
});
