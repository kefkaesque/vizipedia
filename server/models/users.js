var Sequelize = require('sequelize');
var db = require('../config/postgres.js');

var schema = {
  username: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  }
};

var classMethods = {};

classMethods.login = function(username, password) {
  return User.findOne({
    where: {
      username: username
    }
  })
  .then(function(user) {
    if(user.usesPassword(password)) {
      return user;
    }
    return false;
  };
};

classMethods.signup = function(username, password, email) {
  return User.findOne({
    where: {
      username: username
    }
  })
  .then(function(user) {
    if(user) {
      return user;
    }
    return User.findOne({
      where: {
        username: username
      }
    });
  })
  .then(function(user) {
    if(user) {
      return {};
    }
    return User.create({username: username, password: password, email: email})
    .then(function(user){
      return user;
    });
  });
}

// --------------------------------------------------------------------------------

var instanceMethods = {};

instanceMethods.usesPassword = function(password) {
  return this.password === password;
};

// --------------------------------------------------------------------------------

function isValidUsername(username) {
  return true;
}

function isValidPassword(password) {
  return true;
}

function isValidEmail(email) {
  return true;
}

var User = db.define('user', schema, {classMethods: methods});

db.sync();
module.exports = User;
