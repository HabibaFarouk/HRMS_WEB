const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const Faculty = sequelize.define('Faculty', {
    Faculty_ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Faculty_Name: { type: Sequelize.STRING, allowNull: false },
    University_ID: { type: Sequelize.INTEGER }, // Foreign Key
    Dean_Name: { type: Sequelize.STRING },
    Office_Location: { type: Sequelize.STRING },
    Contact_Email: { type: Sequelize.STRING }
}, {
    tableName: 'FACULTY',
    timestamps: false
});

module.exports = Faculty;