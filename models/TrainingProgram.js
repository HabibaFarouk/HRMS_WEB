// models/TrainingProgram.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const TrainingProgram = sequelize.define('TrainingProgram', {
    Program_ID: { 
        type: DataTypes.INTEGER, 
        primaryKey: true,
        autoIncrement: true 
    },
    Program_Code: { type: DataTypes.STRING },
    Title: { type: DataTypes.STRING, allowNull: false },
    Objectives: { type: DataTypes.STRING },
    Type: { type: DataTypes.STRING }, // Internal, External, etc.
    Subtype: { type: DataTypes.STRING },
    Delivery_Method: { type: DataTypes.STRING }, // In-person, Virtual, etc.
    Approval_Status: { type: DataTypes.STRING }
}, {
    tableName: 'Training_Program', // Matches your SQL table name exactly
    freezeTableName: true,
    timestamps: false
});

module.exports = TrainingProgram;