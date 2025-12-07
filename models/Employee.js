// models/Employee.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Employee = sequelize.define('Employee', {
    Employee_ID: { 
        type: DataTypes.INTEGER, 
        primaryKey: true,
        autoIncrement: false 
    },
    First_Name: { type: DataTypes.STRING, allowNull: false },
    Last_Name: { type: DataTypes.STRING, allowNull: false },
    Work_Email: { type: DataTypes.STRING },
    Employment_Status: { type: DataTypes.STRING },
    // Department_ID is REMOVED because it is not in your SQL table
}, {
    tableName: 'EMPLOYEE',
    freezeTableName: true, // Prevents Sequelize from looking for 'Employees'
    timestamps: false      // Prevents looking for createdAt
});

module.exports = Employee;