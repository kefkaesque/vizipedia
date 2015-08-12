var Sequelize = require('sequelize');
var db = require('../config/postgres.js');

var schema = {
  userId: {
    type: Sequelize.INTEGER
  },
  articleId: {
    type: Sequelize.INTEGER
  },
  liked: {
    type: Sequelize.BOOLEAN
  }
};

var classMethods = {};

classMethods.visitIfUnvisited = function(userId, articleId) {
  return visitedArticle.findOrCreate({
    where: {
      userId: userId,
      articleId: articleId
    },
    defaults: {
      liked: false
    }
  });
};

classMethods.toggleLike = function(userId, articleId) {
  return visitedArticle.findOne({
     where: {
      userId: userId,
      articleId: articleId
    }
  })
  .then(function(visited) {
    visited.update({liked: !visited.liked});
  });
};

classMethods.checkIfLiked = function(userId, articleId) {
  return visitedArticle.findOne({
     where: {
      userId: userId,
      articleId: articleId
    }
  })
  .then(function(visited) {
    return visited.liked;
  });
};

classMethods.numLiked = function(articleId) {
  return visitedArticle.findAndCountAll({
     where: {
      articleId: articleId,
      liked: true
    }
  })
  .then(function(result) {
    return result.count;
  });
};

// Return the most recent articles visited by user; "limit" will determine the number returned.
// Returns an array of visitedArticle instances with userId, articleId, liked, createdAt, updatedAt
classMethods.getHistory = function(userId, limit) {
  return visitedArticle.findAll({
    where: {
      userId: userId
    },
    limit: limit,
    order: [['createdAt','DESC']]
  })
  .then(function(articles) {
    return articles;
  });
};

var visitedArticle = db.define('visitedArticles', schema, {classMethods: classMethods});

db.sync();
module.exports = visitedArticle;
