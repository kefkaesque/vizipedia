var Sequelize = require('sequelize');
var db = require('../config/postgres');

var User = require('./User');
var Article = require('./WikiArticle');

var schema = {
  userId: {type: Sequelize.INTEGER},
  articleId: {type: Sequelize.INTEGER}
};

// --------------------------------------------------------------------------------

var Visited = db.define('visited', schema);
User.hasMany(Visited, {foreignKey: "userId"});
Visited.belongsTo(User, {foreignKey: "userId"});

Article.hasMany(Visited, {foreignKey: "articleId"});
Visited.belongsTo(Article, {foreignKey: "articleId"});

db.sync();
module.exports = Visited;
