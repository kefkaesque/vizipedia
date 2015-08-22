var Sequelize = require('sequelize');
var db = require('../config/postgres');

var schema = {
  raceId: {type: Sequelize.INTEGER},
  userId: {type: Sequelize.INTEGER},
  finishTime: {type: Sequelize.INTEGER},
  path: {type: Sequelize.TEXT}
};

// --------------------------------------------------------------------------------

var Racer = db.define('racer', schema);

db.sync();
module.exports = Racer;
