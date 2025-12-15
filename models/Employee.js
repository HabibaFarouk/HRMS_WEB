const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const Employee = sequelize.define('Employee', {
    Employee_ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        // No autoIncrement because your DB doesn't have it
    },
    First_Name: { type: Sequelize.STRING, allowNull: false },
    Last_Name: { type: Sequelize.STRING, allowNull: false },
    Work_Email: { type: Sequelize.STRING },
    Mobile_Phone: { type: Sequelize.STRING },
    Employment_Status: { type: Sequelize.STRING, defaultValue: 'Active' },

    // Required fields (NOT NULL in your DB)
    Emergency_Contact_Name: { type: Sequelize.STRING },
    Emergency_Contact_Phone: { type: Sequelize.STRING },
    Emergency_Contact_Relationship: { type: Sequelize.STRING },
    Residential_City: { type: Sequelize.STRING },
    Residential_Area: { type: Sequelize.STRING },
    Residential_Street: { type: Sequelize.STRING },
    Residential_Country: { type: Sequelize.STRING }
}, {
    tableName: 'EMPLOYEE',
    timestamps: false
});

module.exports = Employee;