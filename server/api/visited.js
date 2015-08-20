var express = require('express');
var router = express.Router();
module.exports = router;

var Recommend = require('../models/Recommend.js');

router.get('/', function(req, res) {
  var userId = req.query.userid;
  var articleId = req.query.articleid;

  if(userId) {
    getUserRecommends(userId)
    .then(function(results) {
      res.send(JSON.stringify(results));
    });
  }
  else if(articleId) {
    getArticleRecommends(articleId)
    .then(function(results) {
      res.send(JSON.stringify(results));
    });
  }
  else
    res.send(404);
});

router.post('/', function(req, res) {
  var articleId = req.body.articleid;
  if(req.user)
    createRecommend(req.user.id, articleId)
    .then(function(results) {
      res.send(JSON.stringify(results));
    });
});

// --------------------------------------------------------------------------------

function getUserRecommends(userId) {
  return Playlist.findAll({
    where: {userId: userId},
    include: []
  });
}

function getArticleRecommends(articleId) {
  return Playlist.findAll({
    where: {articleId: articleId},
    include: []
  });
}

function createRecommend(userId, articleId) {
  return Recommend.create({userId: userId, articleId: articleId});
}
