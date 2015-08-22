var Sequelize = require('sequelize');
var db = require('../config/postgres');
var Race = require('../models/Race.js');

var schema = {
  raceId: {type: Sequelize.INTEGER},
  userId: {type: Sequelize.INTEGER},
  finishTime: {type: Sequelize.INTEGER},
  path: {type: Sequelize.TEXT}
};

// --------------------------------------------------------------------------------

var Racer = db.define('racer', schema);

Race.hasMany(Racer, {foreignKey: "raceId"});
Racer.belongsTo(Race, {foreignKey: "raceId"})

db.sync();
module.exports = Racer;
