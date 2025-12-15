const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const Employee = sequelize.define('Employee', {
    Employee_ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    First_Name: { type: Sequelize.STRING, allowNull: false },
    Last_Name: { type: Sequelize.STRING, allowNull: false },
    
    // Correct Column Name from your screenshot
    Work_Email: { type: Sequelize.STRING, unique: true },

    // CRITICAL FIX: Changing 'Phone_Number' to 'Mobile_Phone'
    Mobile_Phone: { type: Sequelize.STRING },
    
    Hire_Date: { type: Sequelize.DATEONLY },
    Job_ID: { type: Sequelize.INTEGER },
    Department_ID: { type: Sequelize.INTEGER },
    Manager_ID: { type: Sequelize.INTEGER },
    Employment_Status: { 
        type: Sequelize.STRING, 
        defaultValue: 'Active' 
    }
}, {
    tableName: 'EMPLOYEE', // Matches your table
    timestamps: false
});

module.exports = Employee;