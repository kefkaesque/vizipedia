var Sequelize = require('sequelize');
module.exports = new Sequelize(process.env.DATABASE_URL || 'sqlite://viziDb.sqlite');


