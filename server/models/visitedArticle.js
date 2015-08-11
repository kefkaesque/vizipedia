var Sequelize = require('sequelize');
var db = require('../config/postgres.js');

var schema = {
  username: {
    type: Sequelize.STRING
  },
  articleTitle: {
    type: Sequelize.STRING
  },
  liked: {
    type: Sequelize.BOOLEAN
  }
};

var classMethods = {};

classMethods.visitIfUnvisited = function(username, articleTitle) {
  //check if visited already
  visitedArticle.findOrCreate({
    where: {
      username: username,
      articleTitle: articleTitle
    },
    defaults: {
      liked: false
    }
  });

};

classMethods.toggleLike = function(username, articleTitle) {
  visitedArticle.findOne({
     where: {
      username: username,
      articleTitle: articleTitle
    }
  })
  .then(function(visited) {
    visited.update({liked: !visited.liked});
  });

};

// Return the most recent articles visited by user; "limit" will determine the number returned.
// Returns an array of visitedArticle instances with username, articleTitle, liked, createdAt, updatedAt
classMethods.getHistory = function(username, limit) {
  return visitedArticle.findAll({
    where: {
      username: username
    },
    limit: limit,
    order: [['createdAt','DESC']]
  })
  .then(function(articles) {
    return articles;
  })
}

var visitedArticle = db.define('visitedArticles', schema, {classMethods: classMethods});

db.sync();
module.exports = visitedArticle;
