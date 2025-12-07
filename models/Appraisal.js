// models/Appraisal.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Appraisal = sequelize.define('Appraisal', {
    Appraisal_ID: { 
        type: DataTypes.INTEGER, 
        primaryKey: true,
        autoIncrement: true 
    },
    Assignment_ID: { type: DataTypes.INTEGER },
    Cycle_ID: { type: DataTypes.INTEGER },
    Appraisal_Date: { type: DataTypes.DATEONLY },
    Overall_Score: { type: DataTypes.DECIMAL(5, 2) },
    Manager_Comments: { type: DataTypes.STRING },
    Reviewer_ID: { type: DataTypes.INTEGER }
}, {
    tableName: 'APPRAISAL',
    freezeTableName: true,
    timestamps: false
});

module.exports = Appraisal;