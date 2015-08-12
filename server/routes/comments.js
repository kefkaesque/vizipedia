var express = require('express');
var router = express.Router();
var commentModel = require('../models/commentModel.js');
module.exports = router;

router.get('/:articleTitle', function(req, res) {
  commentModel.getArticleComments(req.params.articleTitle)
  .then(function(comments){
    res.send(JSON.stringify(comments));
  });
});

router.post('/:articleTitle', function(req, res) {
  commentModel.addComment(req.body.text, res.locals.user.username, req.params.articleTitle)
  .then(function() {
    return commentModel.getArticleComments(req.params.articleTitle);
  })
  .then(function(comments) {
    res.send(JSON.stringify(comments));
  });
});
