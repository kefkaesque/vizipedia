var Sequelize = require('sequelize');
var db = require('../config/postgres.js');
var wikiArticle = require('../models/wikiArticle.js');
var User = require('../models/user.js');

var schema = {
  words: {
    type: Sequelize.STRING, allowNull: false
  }
};

var classMethods = {};

classMethods.addcomment = function(words, userid, wikiarticleid) {
  return Comment.create({words: words})
  .then(function(comment){
    comment.setUsers([userid]);
    comment.setWikiarticles([wikiarticleid]);
  });
};

classMethods.usergetcomment = function(username) {
  console.log('in usergetcomment!')
  return User.findOne({
      where: {
        username: username
      }
  })
  .then(function(user) {
    console.log('user:', user.dataValues.username);
    user.getComments()
    .then(function(comments){
      for (var i = 0; i < comments.length; i++){
        console.log('user comments :', i, comments[i].dataValues.words);
        comments[i].getWikiarticles()
        .then(function(wikiarticles){
          console.log('user comment wikiarticles :', wikiarticles[0].dataValues.title)
        })
      }
    })
  })
}

classMethods.wikiarticlegetcomment = function(username) {
  return wikiArticle.findOne({
      where: {
        title: username
      }
  })
  .then(function(wikiarticle) {
    console.log('wikiarticle:', wikiarticle.dataValues.title);
    wikiarticle.getComments()
    .then(function(comments){
      for (var i = 0; i < comments.length; i++){
        console.log('wikiarticle comments :', i, comments[i].dataValues.words);
        comments[i].getUsers()
        .then(function(users){
          console.log('wikiarticle comment user :', users[0].dataValues.username)
        })
      }
    })
  })
}

var Comment = db.define('comment', schema, {classMethods: classMethods});


// Define Many to Many relationship between tables

wikiArticle.belongsToMany(Comment, {
  through: 'wikiArticleComment'
});

Comment.belongsToMany(wikiArticle, {
  through: 'wikiArticleComment'
});

User.belongsToMany(Comment, {
  through: 'UserComment'
});

Comment.belongsToMany(User, {
  through: 'UserComment'
});

db.sync();

module.exports = Comment;
