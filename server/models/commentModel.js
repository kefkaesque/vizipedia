var Sequelize = require('sequelize');
var db = require('../config/postgres.js');

var schema = {
  text: {
    type: Sequelize.STRING, allowNull: false
  },
  username: {
    type: Sequelize.STRING
  },
  articleTitle: {
    type: Sequelize.STRING
  }
};

var classMethods = {};

classMethods.addComment = function(text, username, articleTitle) {
  return Comment.create({
    text: text,
    username: username,
    articleTitle: articleTitle
  });
};

classMethods.getArticleComments = function(articleTitle) {
  return Comment.findAll({
    where: {
      articleTitle: articleTitle
    }
  });
};

var Comment = db.define('comments', schema, {classMethods: classMethods});
module.exports = Comment;

db.sync();
