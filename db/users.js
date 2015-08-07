var Sequelize = require('sequelize');
var db = require('../server/config/postgres.js');


var Users = db.define('users', {
  user_name: {
    type: Sequelize.STRING
  },

  email: {
    type: Sequelize.STRING
  },

  password: {
    type: Sequelize.STRING
  }
});

/* .sync() makes Sequelize create the database table for us if it doesn't
 *  exist already: */
db.sync();

//Users Method
module.exports = {

}

// TODO: integrate as Users method
function login(username, pw) {
  return Users.findOne({
    where: {
      user_name: username
    }
  }).then(function(result){
    if(result.password === pw){
      // console.log('You are logged in!');
      return result;
    }else{
      // console.log('Your password is incorrect!');
      return false;
    }
  });
}

// login('carter','');
