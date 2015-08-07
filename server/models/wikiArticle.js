var Sequelize = require('sequelize');
var db = require('../config/postgres.js');

var wikiArticle = db.define('wikiarticle', {
  title: {
    type: Sequelize.STRING
  },
  content: {
    type: Sequelize.STRING
  }
});

db.sync();
module.exports = wikiArticle;
