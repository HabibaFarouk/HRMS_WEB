// models/JobAssignment.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const JobAssignment = sequelize.define('JobAssignment', {
    Assignment_ID: { 
        type: DataTypes.INTEGER, 
        primaryKey: true,
        autoIncrement: true 
    },
    Start_Date: { type: DataTypes.DATEONLY },
    End_Date: { type: DataTypes.DATEONLY },
    Status: { type: DataTypes.STRING }, // Active, Inactive
    Employee_ID: { type: DataTypes.INTEGER },
    Job_ID: { type: DataTypes.INTEGER },
    Contract_ID: { type: DataTypes.INTEGER }
}, {
    tableName: 'JOB_ASSIGNMENT',
    freezeTableName: true,
    timestamps: false
});

module.exports = JobAssignment;