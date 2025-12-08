// models/Employee.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Employee = sequelize.define('Employee', {
    Employee_ID: { 
        type: DataTypes.INTEGER, 
        primaryKey: true,
        autoIncrement: false 
    },
    First_Name: { type: DataTypes.STRING(50), allowNull: false },
    Middle_Name: { type: DataTypes.STRING(50) },
    Last_Name: { type: DataTypes.STRING(50), allowNull: false },
    Arabic_Name: { type: DataTypes.STRING(50) },
    Gender: { type: DataTypes.ENUM('Male', 'Female') },
    Nationality: { type: DataTypes.STRING(64) },
    DOB: { type: DataTypes.DATEONLY },
    Place_of_Birth: { type: DataTypes.STRING(64) },
    Marital_Status: { type: DataTypes.STRING(64) },
    Religion: { type: DataTypes.STRING(20) },
    Employment_Status: { 
        type: DataTypes.ENUM('Active', 'Probation', 'Leave', 'Retired'),
        allowNull: false 
    },
    Mobile_Phone: { type: DataTypes.STRING(20) },
    Work_Phone: { type: DataTypes.STRING(20) },
    Work_Email: { type: DataTypes.STRING(20) },
    Personal_Email: { type: DataTypes.STRING(20) },
    
    // Emergency Contact
    Emergency_Contact_Name: { type: DataTypes.STRING(50) },
    Emergency_Contact_Phone: { type: DataTypes.STRING(20) },
    Emergency_Contact_Relationship: { type: DataTypes.STRING(20) },
    
    // Residential Address
    Residential_City: { type: DataTypes.STRING(20) },
    Residential_Area: { type: DataTypes.STRING(20) },
    Residential_Street: { type: DataTypes.STRING(20) },
    Residential_Country: { type: DataTypes.STRING(20) },
    
    // Permanent Address
    Permanent_City: { type: DataTypes.STRING(20) },
    Permanent_Area: { type: DataTypes.STRING(20) },
    Permanent_Street: { type: DataTypes.STRING(20) },
    Permanent_Country: { type: DataTypes.STRING(20) },
    
    // Statuses
    Medical_Clearance_Status: { type: DataTypes.STRING(50) },
    Criminal_Status: { type: DataTypes.STRING(50) }
}, {
    tableName: 'EMPLOYEE',
    freezeTableName: true,
    timestamps: false
});

module.exports = Employee;