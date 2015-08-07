var Sequelize = require('sequelize');
var db = require('../config/postgres.js');

var wikiArticle = sequelize.define('wikiarticle', {
  page_title: {
    type: Sequelize.STRING
  },
  page_content: {
    type: Sequelize.STRING
  }
});

db.sync();
module.exports = wikiArticle;
