const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const Faculty = sequelize.define('Faculty', {
    Faculty_ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        // No autoIncrement here because your DB doesn't have it
    },
    Faculty_Name: { type: Sequelize.STRING, allowNull: false },
    
    // Matches SQL: Location
    Location: { type: Sequelize.STRING },
    
    // Matches SQL: Contact_Email
    Contact_Email: { type: Sequelize.STRING },

    // Matches SQL: University_ID
    University_ID: { type: Sequelize.INTEGER }
}, {
    tableName: 'FACULTY',
    timestamps: false
});

module.exports = Faculty;