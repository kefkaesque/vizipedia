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

var visitedArticle = db.define('visitedArticles', schema, {classMethods: classMethods});

db.sync();
module.exports = visitedArticle;
