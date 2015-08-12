// var chai = require('chai');
var express = require('express');
// var expect = chai.expect;
var Sequelize = require('sequelize');
var User = require('../server/models/user.js');
var wikiArticle = require('../server/models/wikiArticle.js');
var Comment = require('../server/models/Comment.js');

// describe('Comment db add/retrive function', function() {

var Users = {
  User1 : {
    username: 'testUser1',
    password: 'pw',
    email: 'testUser1@carterchung.com'
  },
  User2 : {
    username: 'testUser2',
    password: 'pw',
    email: 'testUser2@carterchung.com'
  },
  User3 : {
    username: 'testUser3',
    password: 'pw',
    email: 'testUser3@carterchung.com'
  }
};

// before('remove test users from database', function() {
  for (var user in Users) {
    User.destroy({
      where: {
        username: Users[user].username
      }
    });
  }
// })

// after('remove test users from database', function() {
  for (var user in Users) {
    User.destroy({
      where: {
        username: Users[user].username
      }
    });
  }
// })

var Articles = {
  testArticle1 : {
    title: 'Cater1',
    content: 'Pinhead1'
  },
  testArticle2 : {
    title: 'Cater2',
    content: 'Pinhead2'
  },
  testArticle3 : {
    title: 'Cater3',
    content: 'Pinhead3'
  }
}

// before('remove test Article from database', function() {
  for (var article in Articles) {
    wikiArticle.destroy({
      where: {
        title: Articles[article].title
      }
    });
  }
// });

// after('remove test Article from database', function() {
  for (var article in Articles) {
    wikiArticle.destroy({
      where: {
        title: Articles[article].title
      }
    });
  }
// });

var Comments = {
  testComment1 : {
    words: 'Hello1!'
  },
  testComment2 : {
    words: 'Hello2!'
  },
  testComment3 : {
    words: 'Hello3!'
  },
  testComment4 : {
    words: 'Hello4!'
  },
  testComment5 : {
    words: 'Hello5!'
  },
  testComment6 : {
    words: 'Hello6!'
  }
}

// before('remove Comments from database', function() {
  for (var comment in Comments) {
    Comment.destroy({
      where: {
        words: Comments[comment].words
      }
    });
  }
// })

// after('remove Comments from database', function() {
  for (var comment in Comments) {
    Comment.destroy({
      where: {
        words: Comments[comment].words
      }
    });
  }
// })

for (var user in Users) {
  User.signup(Users[user].username, Users[user].password, Users[user].email)
}

// User.signup(User1.username, User1.password, User1.email);
// User.signup(User2.username, User2.password, User2.email);
// User.signup(User3.username, User3.password, User3.email);

for (var article in Articles) {
  wikiArticle.create({title: Articles[article].title, content: Articles[article].content})
}


// wikiArticle.create({title: testArticle1.title, content: testArticle1.content});
// wikiArticle.create({title: testArticle2.title, content: testArticle2.content});
// wikiArticle.create({title: testArticle3.title, content: testArticle3.content});


// UserComments.create({comment: testComment1.comment, userId:1, wikiarticleId:1});
// UserComments.create({comment: testComment2.comment, userId:1, wikiarticleId:2});
// UserComments.create({comment: testComment3.comment, userId:1, wikiarticleId:3});
// UserComments.create({comment: testComment4.comment, userId:2, wikiarticleId:1});
// UserComments.create({comment: testComment5.comment, userId:2, wikiarticleId:3});
// UserComments.create({comment: testComment6.comment, userId:3, wikiarticleId:2});

console.log('Comment :', Comment);

Comment.addcomment(Comments.testComment1.words, 1, 1);
Comment.addcomment(Comments.testComment2.words, 1, 2);
Comment.addcomment(Comments.testComment3.words, 1, 3);
Comment.addcomment(Comments.testComment4.words, 2, 1);
Comment.addcomment(Comments.testComment5.words, 2, 3);


// it('should return false if username already exists', function(done){
  Comment.addcomment(Comments.testComment6.words, 3, 2)
    .then(function(){
      Comment.usergetcomment('testUser1');
      Comment.wikiarticlegetcomment('Cater2')
      .then(function(){
        console.log('Done!')
      });
    });
// });
// });
// Comment.create({words: testComment1.words})
// .then(function(comment){
//   comment.setUsers([1]);
//   comment.setWikiarticles([1]);
// });
// Comment.create({words: testComment2.words})
// .then(function(comment){
//   comment.setUsers([1]);
//   comment.setWikiarticles([2]);
// });
// Comment.create({words: testComment3.words})
// .then(function(comment){
//   comment.setUsers([1]);
//   comment.setWikiarticles([3]);
// });
// Comment.create({words: testComment4.words})
// .then(function(comment){
//   comment.setUsers([2]);
//   comment.setWikiarticles([1]);
// });
// Comment.create({words: testComment5.words})
// .then(function(comment){
//   comment.setUsers([2]);
//   comment.setWikiarticles([3]);
// });
// Comment.create({words: testComment6.words})
// .then(function(comment){
//   comment.setUsers([3]);
//   comment.setWikiarticles([2]);
// });

// console.log('hello!')




// User.findOne({
//     where: {
//       username: 'testUser1'
//     }
// })
// .then(function(user) {
//   console.log('user:', user.dataValues.username);
//   user.getComments()
//   .then(function(comments){
//     for (var i = 0; i < comments.length; i++){
//       console.log('user comments :', i, comments[i].dataValues.words);
//       comments[i].getWikiarticles()
//       .then(function(wikiarticles){
//         console.log('user comment wikiarticles :', wikiarticles[0].dataValues.title)
//         // for (var j = 0; j < wikiarticles.length; j++){
//         //   console.log('j:', j);
//         //   console.log('user comment wikiarticles :', j, wikiarticles[j].dataValues.title)
//         // }
//       })
//     }
//   })
// })

// wikiArticle.findOne({
//     where: {
//       title: 'Cater2'
//     }
// })
// .then(function(wikiarticle) {
//   console.log('wikiarticle:', wikiarticle.dataValues.title);
//   wikiarticle.getComments()
//   .then(function(comments){
//     for (var i = 0; i < comments.length; i++){
//       console.log('wikiarticle comments :', i, comments[i].dataValues.words);
//       comments[i].getUsers()
//       .then(function(users){
//         console.log('wikiarticle comment user :', users[0].dataValues.username)
//         // for (var j = 0; j < users.length; j++){
//         //   console.log('j:', j);
//         //   console.log('wikiarticle comment user :', j, users[j].dataValues.username);
//         // }
//       })
//     }
//   })
// })

// console.log('Users:', WikiArticle)