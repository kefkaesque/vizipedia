var Sequelize = require('sequelize');
var sequelize = new Sequelize(process.env.DATABASE_URL || 'sqlite://viziDb.sqlite');


var Users = sequelize.define('users', {
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

var Wikiinfo = sequelize.define('wikis', {
  page_title: {
    type: Sequelize.STRING
  },

  page_content: {
    type: Sequelize.STRING
  }
});

/* .sync() makes Sequelize create the database table for us if it doesn't
 *  exist already: */
sequelize.sync();

exports.Users = Users;
exports.Wikiinfo = Wikiinfo;