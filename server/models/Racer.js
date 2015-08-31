var Sequelize = require('sequelize');
var db = require('../config/postgres');
var Race = require('../models/Race.js');
var User = require('./User');

var schema = {
  raceId: {type: Sequelize.INTEGER},
  userId: {type: Sequelize.INTEGER},
  finishTime: {type: Sequelize.FLOAT},
  path: {type: Sequelize.TEXT}
};

// --------------------------------------------------------------------------------

var Racer = db.define('racer', schema);

Race.hasMany(Racer, {foreignKey: "raceId"});
Racer.belongsTo(Race, {foreignKey: "raceId"});

User.hasMany(Racer, {foreignKey: "userId"});
Racer.belongsTo(User, {foreignKey: "userId"});

db.sync();
module.exports = Racer;
