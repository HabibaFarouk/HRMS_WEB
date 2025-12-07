// config/db.js
const Sequelize = require('sequelize');

// I have filled this in with your specific data:
const sequelize = new Sequelize('HR_SYSTEM', 'root', 'BenoMySQL2006', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306, // Optional, but good to be explicit since you have it
    logging: false,
});

module.exports = sequelize;