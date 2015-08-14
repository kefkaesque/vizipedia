var Sequelize = require('sequelize');
var db = require('../config/postgres.js');
var Article = require('../models/wikiArticle.js');
var User = require('../models/user.js');
var Promise = require('bluebird');

var schema = {
  text: {
    type: Sequelize.STRING, allowNull: false
  }
};

var classMethods = {};

classMethods.addComment = function(text, username, articleTitle) {
  var userid, articleid;
  // console.log('USERNAME!!!!', username);
  Article.findOne({
    where: {
      title: articleTitle
    }
  })
  .then(function(article) {
    articleid = article.dataValues.id;
  })
  return User.findOne({
    where: {
      username: username
    }
  })
  .then(function(user) {
    userid = user.dataValues.id;
    return Comment.create({text: text})
    .then(function(comment) {
      comment.setWikiarticle([articleid]);
      return comment.setUser([userid]);
    });
  })
};

classMethods.getArticleComments = function(articleTitle) {
  return Article.find({
    where: {
      title: articleTitle
    }
  })
  .then(function(wikiarticle) {
    return Comment.findAll({ 
      where: { 
        wiki_id: wikiarticle.id 
      }
    })
    .then(function(comments) {
      var result = [];
      var files = [];
      for (var i=0; i<comments.length; i++) {
        files.push(Comment.find({
          where:{
            id: comments[i].dataValues.id
          },
          include: [Article, User]
        })
        .then(function(user) {
          result.push(user);
        })
        )
      }
      return Promise.all(files).then(function() {
         return result;
      });
    })
  })
};

classMethods.getUserComments = function(username) {
  return User.find({
    where: {
      username: username
    }
  })
  .then(function(user) {
      return Comment.findAll({ 
        where: { 
          user_id: user.dataValues.id
        }
      })
  })
  .then(function(comments) {
    var result = [];
    var files = [];
    for (var i=0; i<comments.length; i++) {
      files.push(Comment.find({
        where: {
          id: comments[i].dataValues.id
        },
        include: [Article, User]
      })
      .then(function (article) {
        result.push(article);
      })
      )
    }
    return Promise.all(files).then(function() {
      return result;
    });
  })
};

var Comment = db.define('comments', schema, {classMethods: classMethods});

User.hasMany(Comment, {foreignKey: 'user_id'});
Comment.belongsTo(User, {foreignKey: 'user_id'});

Article.hasMany(Comment, {foreignKey: 'wiki_id'});
Comment.belongsTo(Article, {foreignKey: 'wiki_id'});

db.sync();

module.exports = Comment;

