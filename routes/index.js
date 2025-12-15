// routes/index.js
const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');

// --- Debugging Check ---
// This checks if your controller is set up correctly.
// If you see errors in your terminal, it means a function is missing in mainController.js
if (!mainController.getEmployees || !mainController.getAddEmployee) {
    console.error("CRITICAL ERROR: Controller functions are missing. Check mainController.js exports.");
}

// --- 1. Dashboard (Home Page) ---
router.get('/', (req, res) => {
    res.render('dashboard', { pageTitle: 'Dashboard' });
});

// --- 2. Organization Routes ---
router.get('/universities', mainController.getUniversities);
router.get('/faculties', mainController.getFaculties);
router.get('/departments', mainController.getDepartments);

// --- 3. Workforce Routes ---
router.get('/employees', mainController.getEmployees); // View Employee List
router.get('/jobs', mainController.getJobs);           // View Job Roles
router.get('/assignments', mainController.getAssignments); // View Job Assignments

// --- 4. Feature: Add New Employee ---
router.get('/add-employee', mainController.getAddEmployee);   // Step 1: Show the Form
router.post('/add-employee', mainController.postAddEmployee); // Step 2: Save the Data

// --- 5. Placeholder Routes (Coming Soon) ---
// These prevent the app from crashing if you click unfinished links
router.get('/contracts', (req, res) => res.send('Contracts Page - Coming Soon'));
router.get('/cycles', (req, res) => res.send('Performance Cycles - Coming Soon'));
router.get('/kpi', (req, res) => res.send('KPI Scores - Coming Soon'));
router.get('/appraisals', (req, res) => res.send('Appraisals - Coming Soon'));

module.exports = router;