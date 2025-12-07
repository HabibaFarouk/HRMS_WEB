// index.js
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/db');

// Import Routes (You'll need to create this file)
const employeeRoutes = require('./routes/employeeRoutes'); 

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve your CSS files

// Routes
app.use('/api/employees', employeeRoutes);

// Test Database Connection and Start Server
sequelize.authenticate()
    .then(() => {
        console.log('Database connected...');
        // Sync models (Be careful: force: true deletes data!)
        // return sequelize.sync(); 
    })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch(err => console.log('Error: ' + err));