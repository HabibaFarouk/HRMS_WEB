// models/Appeal.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Appeal = sequelize.define('Appeal', {
    Appeal_ID: { 
        type: DataTypes.INTEGER, 
        primaryKey: true,
        autoIncrement: true 
    },
    Appraisal_ID: { type: DataTypes.INTEGER },
    Submission_Date: { type: DataTypes.DATEONLY },
    Reason: { type: DataTypes.STRING },
    Original_Score: { type: DataTypes.DECIMAL(5, 2) },
    Approval_Status: { type: DataTypes.STRING },
    Appeal_Outcome_Score: { type: DataTypes.DECIMAL(5, 2) }
}, {
    tableName: 'APPEAL',
    freezeTableName: true,
    timestamps: false
});

module.exports = Appeal;