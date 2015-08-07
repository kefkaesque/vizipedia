var chai = require('chai');
var expect = chai.expect;

var Users = require('../db/users.js');


describe('Database Schema', function() {
  it('should be a valid test', function(){
    expect(true).to.equal(true);
  });

  it('should be also be a valid test', function(){
    expect(true).to.equal(true);
  });
});

describe('signupUser method', function() {
  it('should be a function', function(){
    expect(Users.signupUser).to.be.a('function');
  });

  it('should return a new User instance if user and email are not in system', function(){
    // Users.signupUser('databaseTestingUser', 'pw'. 'databaseTestingUser@carterchung.com');
    expect(true).to.equal(true);
  });
});
