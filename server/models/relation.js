var Sequelize = require('sequelize');
var db = require('../config/postgres.js');
var recommend = require('./Recommend.js');
var User = require('./User');
var Article = require('./WikiArticle');

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
  return Relation.findOne({
    where: {
      follower: userId,
      following: followingId
    }
  })
  .then(function(user) {
    if (user) {
      return this.unFollow(userId, followingId);
    } else {
      return Relation.create({
        follower: userId,
        following: followingId
      });
    }
  });
};
classMethods.toggle = function(userId, followingId) {
  console.log('!!!!!!', this.follow(userId, followingId));
  if (this.follow(userId, followingId)) {
    return Relation.create({
      follower: userId,
      following: followingId
    });
  } else {
    return this.unFollow(userId, followingId);
  }
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
    return recommend.findAll({
      where: {
        userId: res
      }
    })
    .then(function(recs) {
      var recIds = [];
      for (var j = 0; j < recs.length; j++) {
           recIds.push(recs[j].get('id'));
      }
      // find all of the users and article titles
      return recommend.findAll({
        where: {
          id: recIds
        },
        include: [{
          model: Article
        },
        {
          model: User
        }]
      })
      .then(function(results) {
        var data = [];
        for (var k = 0; k<results.length; k++) {
          data.push({username: results[k].user.dataValues.username, title:results[k].wikiarticle.dataValues.title, createdAt: results[k].dataValues.createdAt})
        }
        return data;
      })
    });
  });
};

classMethods.getStats = function(userId) {
  var stats = {};
  return Relation.findAndCountAll({
    where: {
      follower: userId
    }
  })
  .then(function(res) {
    return res;
  })
  .then(function(res) {
    stats.following = res.count;
    return Relation.findAndCountAll({
      where: {
        following: userId
      }
    })
    .then(function(res) {
      return res;
    })
    .then(function(res) {
      stats.followedBy = res.count;
      return stats;
    });
  });
};


var Relation = db.define('relations', schema, {classMethods: classMethods});
Relation.getStats(1);
db.sync();
module.exports = Relation;
