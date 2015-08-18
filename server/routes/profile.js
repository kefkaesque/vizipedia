
var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var visitedArticle = require('../models/visitedArticle.js');
var relation = require('../models/relation.js');

module.exports = router;

router.get('/:userName', function(req, res) {
  getdata(req.params.userName, function(data) {
    res.send(JSON.stringify(data));
  });
});

router.post('/', function(req, res) {
  // use res.locals.user.id for follower column
  // req.body is for following column
  console.log('Profile Post request! req:', req);
  User.findOne({
    where: {
      username: req.body.user
    }
  })
  .then(function(user) {
    relation.follow(res.locals.user.id, user.dataValues.id)
    .then(function(relation){
      console.log('relation created', relation);
      getdata(req.body.user, function(data) {
      res.send(JSON.stringify(data));
  });
    });
  });
});

var getdata = function(user , cb) {
  var data = {};
  data.username = user;
  User.findOne({
    where: {
      username: user
    }
  })
  .then(function(user) {
    data.id = user.dataValues.id;
    visitedArticle.numRead(user.dataValues.id)
    .then(function(numArticle){
      data.numArticle = numArticle;
      data.followedby = 15;
      data.following = 100;
      console.log('getdata return data:', data);
      cb(data);
    });
  });
};


router.get('/getStats', function(req, res) {
  relation.getStats(res.locals.user.id)
  .then(function(res) {
    res.send(JSON.stringify(res));
  });
});

