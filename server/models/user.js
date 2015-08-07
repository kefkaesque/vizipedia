var Sequelize = require('sequelize');
var db = require('../server/config/postgres.js');

var Users = db.define('users', 
  {
    username: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    }
  },
  {
    classMethods: {
      signupUser: function(username, password, email) {
        // If user name found, throw warning. Then if email found, throw warning. Else create new user account
        return this.findOne({ 
          where: {
            username: username
          } 
        })
        .then(function(result) {
          console.log('result: ', result)
          if (result) {
            console.log('Username exists!');
            return false;
          } else {
            return this.findOne({ 
              where: {
                email: email
              } 
            })
            .then(function(result) {
              if (result) {
                console.log('Email exists!');
                return false;
              } else {
                return this.create({username: username, password: password, email: email})
                .then(function(user){
                  return user;
                });
              }
            })
          }
        });
      },
      login: function(username, pw) {
        return this.findOne({
          where: {
            username: username
          }
        })
        .then(function(result) {
          if(result.password === pw){
            console.log('You are logged in!');
            return result;
          }else{
            console.log('Your password is incorrect!');
            return false;
          }
        });
      }
    }
  }
);

/* .sync() makes Sequelize create the database table for us if it doesn't
 *  exist already: */
db.sync();

module.exports = Users;
