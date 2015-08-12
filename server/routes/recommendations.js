var express = require('express');
var router = express.Router();
module.exports = router;

var VisitedArticle = require('../models/visitedArticle.js');
var configEnv = require('../config/env.js');

router.get('/:articleId', function(req, res) {
  if (!res.locals.user.id) {
    // do something if user is not logged in
  }
  VisitedArticle.toggleRec(res.locals.user.id, req.params.articleId)
  .then(function() {
    return VisitedArticle.numRec(req.params.articleId);
  })
  .then(function(result) {
    res.send(result + '');
  });
});
