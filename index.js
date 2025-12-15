// index.js - Main Server File
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const sequelize = require('./config/db'); // Database Connection

// Import Routes
const mainRoutes = require('./routes/index'); 

const app = express();
const PORT = process.env.PORT || 3000;

// --- Middleware Setup ---
// These lines allow the server to read data from forms (like "Add Employee")
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (CSS, Images) from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// --- View Engine Setup ---
// This tells the server to use EJS files in the 'views' folder
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// --- Connect Routes ---
// This tells the app to use the routes defined in 'routes/index.js'
app.use('/', mainRoutes); 

// --- Database Connection & Server Start ---
sequelize.authenticate()
    .then(() => {
        console.log('Database connected successfully...');
        
        // Start the server only after the database connects
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });