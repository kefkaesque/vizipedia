var chai = require('chai');
var expect = chai.expect;
var Sequelize = require('sequelize');
var Users = require('../db/users.js');


// describe('Database Schema', function() {
//   it('should be a valid test', function(){
//     expect(true).to.equal(true);
//   });

// });

describe('signupUser method', function() {

  var testUser = {
    username: 'testUser',
    password: 'pw',
    email: 'testUser@carterchung.com'
  };

  beforeEach('remove test user from database', function() {
    Users.destroy({
      where: {
        username: testUser.username
      }
    });
  })

  it('should be a function', function(){
    expect(Users.signupUser).to.be.a('function');
  });

  it('should return false if username already exists', function(done){
    //sign up our test user
    Users.signupUser(testUser.username, testUser.password, testUser.email)
    .then(function(){
      //sign up our test user again
      return Users.signupUser(testUser.username, '', '');
    })
    .then(function(result){
      expect(result).to.equal(false);
      done();
    });

  });

  it('should return false if username already exists', function(done){
    //sign up our test user
    Users.signupUser(testUser.username, testUser.password, testUser.email)
    .then(function(){
      //sign up a user with a different username but same email
      return Users.signupUser('somethingElse', '', testUser.email);
    })
    .then(function(result){
      expect(result).to.equal(false);
      done();
    });

  });

  it('should return a new User instance if user and email are not in system', function(done){
    Users.signupUser(testUser.username, testUser.password, testUser.email)
    .then(function(user){
      expect(user.username).to.equal(testUser.username);
      done();
    })
  });

});
