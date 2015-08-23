var Sequelize = require('sequelize');
var db = require('../config/postgres');

var schema = {
  start: {type: Sequelize.STRING},
  end: {type: Sequelize.STRING}
};

// --------------------------------------------------------------------------------

var Race = db.define('race', schema);

db.sync();
module.exports = Race;
