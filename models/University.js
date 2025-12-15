const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const University = sequelize.define('University', {
    University_ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    University_Name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Acronym: {
        type: Sequelize.STRING
    },
    Established_Year: {
        type: Sequelize.INTEGER
    },
    Accreditation_Body: {
        type: Sequelize.STRING
    },
    Address: {
        type: Sequelize.STRING
    },
    Contact_Email: {
        type: Sequelize.STRING
    },
    Website_URL: {
        type: Sequelize.STRING
    }
}, {
    tableName: 'UNIVERSITY', // Matches your exact SQL table name
    timestamps: false        // Disables 'createdAt' and 'updatedAt' columns
});

module.exports = University;