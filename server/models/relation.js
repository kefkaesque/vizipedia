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

// get all following userIDs
classMethods.getFollowing = function(userId) {
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
  });
};

// get all recommended articles from all following
classMethods.getFollowingRecommended = function(userIds) {
  return Relation.findAll({
    where: {
      follower: userIds,
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
        userId: userIds
      }
    });
  })
  .then(function(recs) {
    var recIds = [];
    for (var j = 0; j < recs.length; j++) {
         recIds.push(recs[j].get('id'));
    }
    return recommend.findAll({
      where: {
        id: recIds,
        createdAt: {
          $lt: new Date(),
          $gt: new Date(new Date() - 3 * 24 * 60 * 60 * 1000)
        }
      },
      include: [{
        model: Article
      },
      {
        model: User
      }]
    });
  })
  .then(function(results) {
    var data = [];
    for (var k = results.length-1; k >= 0; k--) {
      data.push({username: results[k].user.dataValues.username, title:results[k].wikiarticle.dataValues.title, createdAt: results[k].dataValues.createdAt});
    }
    return data;
  });
};

// get all followings' & followings' followings' username
classMethods.getFollowingFollowing = function(userIds) {
  var relation = [];
  return Relation.findAll({
    where: {
      follower: userIds,
      createdAt: {
        $lt: new Date(),
        $gt: new Date(new Date() - 3 * 24 * 60 * 60 * 1000)
      }
    }
  })
  .then(function(followingFollowing) {
    for (var j = 0; j < followingFollowing.length; j++){
      relation.push({follower: followingFollowing[j].dataValues.follower, following: followingFollowing[j].dataValues.following, createdAt: followingFollowing[j].dataValues.createdAt});
    }
    return relation;
  })
  .then(function(relation) {
     return relation;
  });
};
// get all of the playlists created by followings
classMethods.getFollowingFollowing = function(userIds) {
  var relation = [];
  return Relation.findAll({
    where: {
      follower: userIds,
        createdAt: {
          $lt: new Date(),
          $gt: new Date(new Date() - 3 * 24 * 60 * 60 * 1000)
        }
    }
  })
  .then(function(followingFollowing) {
    for (var j = 0; j < followingFollowing.length; j++){
      relation.push({follower: followingFollowing[j].dataValues.follower, following: followingFollowing[j].dataValues.following, createdAt: followingFollowing[j].dataValues.createdAt});
    }
    return relation;
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
db.sync();
module.exports = Relation;
