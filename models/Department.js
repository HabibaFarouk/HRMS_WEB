// models/Department.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Department = sequelize.define('Department', {
    Department_ID: { 
        type: DataTypes.INTEGER, 
        primaryKey: true,
        autoIncrement: false 
    },
    Department_Name: { type: DataTypes.STRING, allowNull: false },
    Department_Type: { type: DataTypes.STRING }, // Simplified for safety
    Location: { type: DataTypes.STRING },
    Contact_Email: { type: DataTypes.STRING }
}, {
    tableName: 'DEPARTMENT',
    freezeTableName: true,
    timestamps: false
});

module.exports = Department;