var Sequelize = require('sequelize');
var db = require('../config/postgres.js');

var wikiArticle = db.define('wikiarticle', {
  query: {
    type: Sequelize.STRING,
    unique: true
  },
  title: {
    type: Sequelize.STRING
  },
  content: {
    type: Sequelize.STRING
  },
  recommend: {
    type: Sequelize.INTEGER
  }
});

db.sync();
module.exports = wikiArticle;
