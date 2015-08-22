var Sequelize = require('sequelize');
var db = require('../config/postgres');

var schema = {
  startId: {type: Sequelize.INTEGER},
  endId: {type: Sequelize.INTEGER}
};

// --------------------------------------------------------------------------------

var Race = db.define('race', schema);

db.sync();
module.exports = Race;
