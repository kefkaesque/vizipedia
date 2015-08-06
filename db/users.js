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
