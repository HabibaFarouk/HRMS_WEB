// models/PerformanceCycle.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const PerformanceCycle = sequelize.define('PerformanceCycle', {
    Cycle_ID: { 
        type: DataTypes.INTEGER, 
        primaryKey: true,
        autoIncrement: false 
    },
    Cycle_Name: { type: DataTypes.STRING, allowNull: false },
    Cycle_Type: { type: DataTypes.STRING },
    Start_Date: { type: DataTypes.DATEONLY },
    End_Date: { type: DataTypes.DATEONLY },
    Submission_Deadline: { type: DataTypes.DATEONLY }
}, {
    tableName: 'PERFORMANCE_CYCLE',
    freezeTableName: true,
    timestamps: false
});

module.exports = PerformanceCycle;