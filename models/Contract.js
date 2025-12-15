const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const Contract = sequelize.define('Contract', {
    Contract_ID: { type: Sequelize.INTEGER, primaryKey: true }, // No Auto-Increment
    Contract_Name: { type: Sequelize.STRING },
    Type: { type: Sequelize.STRING },
    Work_Modality: { type: Sequelize.STRING },
    Default_Duration: { type: Sequelize.INTEGER }
}, { tableName: 'CONTRACT', timestamps: false });

module.exports = Contract;