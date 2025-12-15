const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const ObjectiveKPI = sequelize.define('ObjectiveKPI', {
    KPI_ID: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    KPI_Name: { type: Sequelize.STRING },
    Measurement_Unit: { type: Sequelize.STRING },
    Target_Value: { type: Sequelize.DECIMAL(10, 2) }
}, { tableName: 'OBJECTIVE_KPI', timestamps: false });

module.exports = ObjectiveKPI;