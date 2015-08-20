var Sequelize = require('sequelize');
var db = require('../config/postgres');

var User = require('./User');
var Article = require('./WikiArticle');

var schema = {
  userId: {type: Sequelize.INTEGER},
  articleId: {type: Sequelize.INTEGER}
};

// --------------------------------------------------------------------------------

var Recommend = db.define('recommend', schema);
User.hasMany(Recommend, {foreignKey: "userId"});
Recommend.belongsTo(User, {foreignKey: "userId"});

Article.hasMany(Recommend, {foreignKey: "articleId"});
Recommend.belongsTo(Article, {foreignKey: "articleId"});

db.sync();
module.exports = Recommend;
