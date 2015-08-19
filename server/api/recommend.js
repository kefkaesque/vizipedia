var express = require('express');
var router = express.Router();
module.exports = router;

var Recommend = require('../models/Recommend.js');

router.get('/', function(req, res) {
  var userId = req.query.userid;

  getUserRecommends(userId)
  .then(function(results) {
    res.send(JSON.stringify(results));
  });
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
  return Playlist.findOne({
    where: {userId: userId},
    include: []
  });
};

function createRecommend(userId, articleId) {
  return Recommend.create({userId: userId, articleId: articleId});
};
