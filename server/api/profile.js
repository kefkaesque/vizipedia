var express = require('express');
var router = express.Router();
var User = require('../models/User');
var visitedArticle = require('../models/visitedArticle.js');
var relation = require('../models/relation.js');

module.exports = router;

router.get('/:userName', function(req, res) {
  getData(req.params.userName, function(data) {
    res.send(JSON.stringify(data));
  });
});

router.post('/', function(req, res) {
  // use res.locals.user.id for follower column
  // req.body is for following column
  User.findOne({
    where: {
      username: req.body.user
    }
  })
  .then(function(user) {
    relation.follow(res.locals.user.id, user.dataValues.id)
    .then(function(relation) {
      getData(req.body.user, function(data) {
      res.send(JSON.stringify(data));
  });
    });
  });
});

var getData = function(user , cb) {
  var data = {};
  data.username = user;
  User.findOne({
    where: {
      username: user
    }
  })
  .then(function(user) {
    if (!user) {
      cb(data);
    }
    if (user) {
    data.id = user.dataValues.id;
    visitedArticle.numRead(user.dataValues.id)
    .then(function(numArticle) {
      data.numArticle = numArticle;
        relation.getStats(data.id)
        .then(function(res) {
          data.followedBy = res.followedBy;
          data.following = res.following;
          cb(data);
        });
    });
    }
  });
};
