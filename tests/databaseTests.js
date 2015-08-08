var chai = require('chai');
var expect = chai.expect;
var Sequelize = require('sequelize');
var Users = require('../server/models/user.js');


// describe('Database Schema', function() {
//   it('should be a valid test', function(){
//     expect(true).to.equal(true);
//   });

// });

describe('signup method', function() {

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

  after('remove test user from database', function() {
    Users.destroy({
      where: {
        username: testUser.username
      }
    });
  })

  it('should be a function', function(){
    expect(Users.signup).to.be.a('function');
  });

  it('should return false if username already exists', function(done){
    //sign up our test user
    Users.signup(testUser.username, testUser.password, testUser.email)
    .then(function(){
      //sign up our test user again
      return Users.signup(testUser.username, '', '');
    })
    .then(function(result){
      expect(result).to.equal(false);
      done();
    });

  });

  it('should return false if username already exists', function(done){
    //sign up our test user
    Users.signup(testUser.username, testUser.password, testUser.email)
    .then(function(){
      //sign up a user with a different username but same email
      return Users.signup('somethingElse', '', testUser.email);
    })
    .then(function(result){
      expect(result).to.equal(false);
      done();
    });

  });

  it('should return a new User instance if user and email are not in system', function(done){
    Users.signup(testUser.username, testUser.password, testUser.email)
    .then(function(user){
      expect(user.username).to.equal(testUser.username);
      done();
    })
  });

});

describe('login method', function() {

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

  after('remove test user from database', function() {
    Users.destroy({
      where: {
        username: testUser.username
      }
    });
  })

  it('should be a function', function(){
    expect(Users.login).to.be.a('function');
  });

  it('should return user if user exists', function(done){
    //sign up our test user
    Users.signup(testUser.username, testUser.password, testUser.email)
    .then(function(){
      //sign up our test user again
      return Users.login(testUser.username, testUser.password);
    })
    .then(function(user){
      expect(user.username).to.equal(testUser.username);
      done();
    });

  });

  it('should return false if username doesn\'t exists', function(done){
    //log in with wrong username
    Users.login('somethingElse', testUser.password)
    .then(function(result){
      expect(result).to.equal(false);
      done();
    });
  });

  it('should return false if password is wrong', function(done){
        //sign up our test user
    Users.signup(testUser.username, testUser.password, testUser.email)
    .then(function(){
      //log in with wrong password
      return Users.login(testUser.username, 'somethingElse')
    })
    .then(function(result){
      expect(result).to.equal(false);
      done();
    });
  });

});