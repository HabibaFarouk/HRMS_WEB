// index.js
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { sequelize } = require('./models');
const mainController = require('./controllers/maincontroller.js');

const app = express();
const PORT = process.env.PORT || 3000;

// ==========================================
// MIDDLEWARE SETUP
// ==========================================
app.set('view engine', 'ejs'); 
app.set('views', path.join(__dirname, 'views')); // Forces server to look in the right folder
app.use(express.static(path.join(__dirname, 'public'))); // For CSS/Images
app.use(bodyParser.urlencoded({ extended: false })); // To read form data

// ==========================================
// ROUTES
// ==========================================

// --- 1. EMPLOYEES (Dashboard) ---
app.get('/', mainController.getDashboard);              // Read (List)
app.get('/add-employee', mainController.getAddEmployeePage); // Create (Form)
app.post('/add-employee', mainController.postAddEmployee);   // Create (Action)
app.get('/edit-employee/:id', mainController.getEditEmployeePage); // Update (Form)
app.post('/edit-employee', mainController.postEditEmployee);       // Update (Action)
app.post('/delete-employee', mainController.deleteEmployee);       // Delete

// --- 2. DEPARTMENTS ---
app.get('/departments', mainController.getDepartments);
app.get('/add-department', mainController.getAddDepartment);
app.post('/add-department', mainController.postAddDepartment);
app.get('/edit-department/:id', mainController.getEditDepartment);
app.post('/edit-department', mainController.postEditDepartment);
app.post('/delete-department', mainController.deleteDepartment);

// --- 3. JOBS ---
app.get('/jobs', mainController.getJobs);
app.get('/add-job', mainController.getAddJob);
app.post('/add-job', mainController.postAddJob);
app.get('/edit-job/:id', mainController.getEditJob);
app.post('/edit-job', mainController.postEditJob);
app.post('/delete-job', mainController.deleteJob);

// --- 4. JOB ASSIGNMENTS ---
app.get('/assignments', mainController.getJobAssignments);
app.get('/add-assignment', mainController.getAddAssignment);
app.post('/add-assignment', mainController.postAddAssignment);
app.get('/edit-assignment/:id', mainController.getEditAssignment);
app.post('/edit-assignment', mainController.postEditAssignment);
app.post('/delete-assignment', mainController.deleteAssignment);

// --- 5. TRAINING PROGRAMS ---
app.get('/training', mainController.getTrainingPrograms);
app.get('/add-training', mainController.getAddTraining);
app.post('/add-training', mainController.postAddTraining);
app.get('/edit-training/:id', mainController.getEditTraining);
app.post('/edit-training', mainController.postEditTraining);
app.post('/delete-training', mainController.deleteTraining);

// --- 6. PERFORMANCE (Cycles, Appraisals, Appeals) ---
app.get('/performance', mainController.getPerformance);

// Performance Cycles
app.get('/add-cycle', mainController.getAddCycle);
app.post('/add-cycle', mainController.postAddCycle);
app.get('/edit-cycle/:id', mainController.getEditCycle);
app.post('/edit-cycle', mainController.postEditCycle);

// Appraisals (Only Add, usually we don't edit history directly)
app.get('/add-appraisal', mainController.getAddAppraisal);
app.post('/add-appraisal', mainController.postAddAppraisal);

// Appeals (Linked to specific Appraisal)
app.get('/add-appeal/:id', mainController.getAddAppeal);
app.post('/add-appeal', mainController.postAddAppeal);

app.get('/edit-appraisal/:id', mainController.getEditAppraisal);
app.post('/edit-appraisal', mainController.postEditAppraisal);
app.post('/delete-appraisal', mainController.deleteAppraisal);
// ==========================================
// SERVER START
// ==========================================
sequelize.authenticate()
    .then(() => {
        console.log('Connection to HR_SYSTEM established successfully.');
        // Sync models (Optional: be careful using force:true in production)
        // return sequelize.sync(); 
        app.listen(PORT, () => {
            console.log(`Server is running at http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });