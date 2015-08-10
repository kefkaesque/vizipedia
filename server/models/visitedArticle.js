var Sequelize = require('sequelize');
var db = require('../config/postgres.js');

var schema = {
  username: {
    type: Sequelize.STRING
  },
  articleTitle: {
    type: Sequelize.STRING
  }
};

var classMethods = {};

classMethods.visitIfUnvisited = function(username, articleTitle) {
  //check if visited already
  visitedArticle.findOne({
    where: {
      username: username,
      articleTitle: articleTitle
    }
  })
  .then(function(visited) {
    //if not visited already, mark as visited
    if(!visited) {
      visitedArticle.create({username: username, articleTitle: articleTitle})
    }
  });
};

var visitedArticle = db.define('visitedArticles', schema, {classMethods: classMethods});

db.sync();
module.exports = visitedArticle;
