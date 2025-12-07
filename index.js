// index.js
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { sequelize } = require('./models');
const mainController = require('./controllers/maincontroller.js');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.set('view engine', 'ejs'); 
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.get('/', mainController.getDashboard);
app.get('/departments', mainController.getDepartments);
app.get('/jobs', mainController.getJobs);
app.get('/assignments', mainController.getJobAssignments);
app.get('/training', mainController.getTrainingPrograms);
app.get('/performance', mainController.getPerformance); // <--- NEW ROUTE

// ... existing routes ...

// Departments
app.get('/add-department', mainController.getAddDepartment);
app.post('/add-department', mainController.postAddDepartment);

// Jobs
app.get('/add-job', mainController.getAddJob);
app.post('/add-job', mainController.postAddJob);

// Assignments
app.get('/add-assignment', mainController.getAddAssignment);
app.post('/add-assignment', mainController.postAddAssignment);

// Training
app.get('/add-training', mainController.getAddTraining);
app.post('/add-training', mainController.postAddTraining);

// Performance (Cycles & Appraisals)
app.get('/add-cycle', mainController.getAddCycle);
app.post('/add-cycle', mainController.postAddCycle);
app.get('/add-appraisal', mainController.getAddAppraisal);
app.post('/add-appraisal', mainController.postAddAppraisal);
// Appeals
app.get('/add-appeal/:id', mainController.getAddAppeal); // Note the /:id
app.post('/add-appeal', mainController.postAddAppeal);
// index.js

// ... existing routes ...

// Add this EXACT line for the GET request:
app.get('/add-employee', mainController.getAddEmployeePage);

// Add this line for the POST (saving) request:
app.post('/add-employee', mainController.postAddEmployee);
// Start Server
sequelize.authenticate()
    .then(() => {
        console.log('Connection to HR_SYSTEM established successfully.');
        app.listen(PORT, () => {
            console.log(`Server is running at http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });