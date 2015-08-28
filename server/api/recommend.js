var express = require('express');
var router = express.Router();
module.exports = router;
var Article = require('../models/WikiArticle.js');
var User = require('../models/User');
var Recommend = require('../models/Recommend.js');

router.get('/', function(req, res) {
  var userId = req.query.userid;
  var articleId = req.query.articleid;
  if(userId && articleId) {
    if(!userId) {
      res.send('[]');
    } else {
      isArticleRecommended(userId, articleId)
      .then(function(results) {
        res.send(JSON.stringify(results));
      });
    }
  }
  else if(userId) {
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
  var articleId = req.body.articleId;
  if(req.user) {
    createRecommend(req.user.id, articleId)
    .then(function(results) {
      res.send(JSON.stringify(results));
    });
  } else {
    res.send('[]');
  }
});

router.delete('/', function(req, res) {
  var articleId = req.body.articleId;
  if(req.user) {
    deleteRecommend(req.user.id, articleId)
    .then(function(results) {
      res.send(JSON.stringify(results));
    });
  } else {
    res.send('[]');
  }
});

// --------------------------------------------------------------------------------

function isArticleRecommended(userId, articleId) {
  return Recommend.findAll({
    where: {
      userId: userId,
      articleId: articleId
    },
    include: []
  });
}

function getUserRecommends(userId) {
  return Recommend.findAll({
    where: {userId: userId},
    include: [Article]
  });
}

function getArticleRecommends(articleId) {
  return Recommend.findAll({
    where: {articleId: articleId},
    include: [{
      model: User,
      attributes: ['username']
    }]
  });
}

function createRecommend(userId, articleId) {
  return Recommend.findOrCreate({
    where: {
      userId: userId,
      articleId: articleId
    }
  });
}

function deleteRecommend(userId, articleId) {
  return Recommend.destroy({
    where: {
      userId: userId,
      articleId: articleId
    }
  });
}
