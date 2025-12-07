// models/Job.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Job = sequelize.define('Job', {
    Job_ID: { 
        type: DataTypes.INTEGER, 
        primaryKey: true,
        autoIncrement: true 
    },
    Job_Title: { type: DataTypes.STRING, allowNull: false },
    Job_Level: { type: DataTypes.STRING }, // Entry, Mid, Senior...
    Min_Salary: { type: DataTypes.DECIMAL(10, 2) },
    Max_Salary: { type: DataTypes.DECIMAL(10, 2) },
    Department_ID: { type: DataTypes.INTEGER } // Foreign Key
}, {
    tableName: 'JOB',
    freezeTableName: true,
    timestamps: false
});

module.exports = Job;