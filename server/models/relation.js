var Sequelize = require('sequelize');
var db = require('../config/postgres.js');
var VisitedArticle = require('./visitedArticle.js');

var schema = {
  follower: {
    type: Sequelize.INTEGER
  },
  following: {
    type: Sequelize.INTEGER
  },
};

var classMethods = {};
// run if isFollowing is False
classMethods.follow = function(userId, followingId) {
  return Relation.findOrCreate({
    where: {
      follower: userId,
      following: followingId
    }
  });
};
// run if isFollowing method is true
classMethods.unFollow = function(userId, followingId) {
  return Relation.destroy({
    where: {
      follower: userId,
      following: followingId
    }
  });
};
// return true or false if the user is following
classMethods.isFollowing = function(userId, followingId) {
  return Relation.findOne({
    where: {
      follower: userId,
      following: followingId
    }
  })
  .then(function(entry) {
    if (entry) {
      return true;
    }
    return false;
  });
};
// get all recommended articles from all following
classMethods.getFollowingRecommended = function(userId) {
  return Relation.findAll({
    where: {
      follower: userId,
    }
  })
  .then(function(following) {
    var ids = [];
    for (var i = 0; i < following.length; i++) {
      ids.push(following[i].get('following'));
    }
    return ids;
  })
  .then(function(res) {
    return VisitedArticle.findAll({
      where: {
        userId: res,
        recommended: true
      }
    })
    .then(function(recs) {
      var articleIds = [];
      for (var j = 0; j < recs.length; j++) {
        articleIds.push(recs[j].get('articleId'));
      }
      return articleIds;
    });
  });
};

var Relation = db.define('relations', schema, {classMethods: classMethods});

db.sync();
module.exports = Relation;
