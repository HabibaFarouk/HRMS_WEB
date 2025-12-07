// controllers/maincontroller.js
const { 
    Employee, Department, Job, JobAssignment, 
    TrainingProgram, PerformanceCycle, Appraisal, Appeal 
} = require('../models');

// 1. Employee Dashboard
exports.getDashboard = async (req, res) => {
    try {
        const employees = await Employee.findAll({ limit: 50 });
        res.render('dashboard', { pageTitle: 'HR System Dashboard', employees });
    } catch (error) { res.status(500).send("Error: " + error.message); }
};

// 2. Departments
exports.getDepartments = async (req, res) => {
    try {
        const departments = await Department.findAll();
        res.render('department', { pageTitle: 'Department Directory', departments });
    } catch (error) { res.status(500).send("Error: " + error.message); }
};

// 3. Jobs
exports.getJobs = async (req, res) => {
    try {
        const jobs = await Job.findAll();
        res.render('job', { pageTitle: 'Job Positions', jobs });
    } catch (error) { res.status(500).send("Error: " + error.message); }
};

// 4. Assignments
exports.getJobAssignments = async (req, res) => {
    try {
        const assignments = await JobAssignment.findAll({
            include: [{ model: Employee }, { model: Job }]
        });
        res.render('jobassignment', { pageTitle: 'Job Assignments', assignments });
    } catch (error) { res.status(500).send("Error: " + error.message); }
};

// 5. Training
exports.getTrainingPrograms = async (req, res) => {
    try {
        const programs = await TrainingProgram.findAll();
        res.render('trainingprogram', { pageTitle: 'Training Programs', programs });
    } catch (error) { res.status(500).send("Error: " + error.message); }
};

// 6. Performance Records (NEW - COMPLEX)
exports.getPerformance = async (req, res) => {
    try {
        const appraisals = await Appraisal.findAll({
            include: [
                { model: PerformanceCycle }, // Get Cycle Name
                { model: Appeal },           // Get Appeal Info (if any)
                { 
                    model: JobAssignment,    // Get Assignment...
                    include: [{ model: Employee }] // ...to get Employee Name
                }
            ]
        });
        res.render('performance', { 
            pageTitle: 'Performance Appraisals',
            appraisals: appraisals 
        });
    } catch (error) {
        console.error("Error fetching performance:", error);
        res.status(500).send("Error: " + error.message);
    }
};
// ... existing code ...

// --- 1. DEPARTMENTS ---
exports.getAddDepartment = (req, res) => {
    res.render('addDepartment');
};

exports.postAddDepartment = async (req, res) => {
    try {
        await Department.create(req.body);
        res.redirect('/departments');
    } catch (error) { res.status(500).send(error.message); }
};

// --- 2. JOBS ---
exports.getAddJob = (req, res) => {
    res.render('addJob');
};

exports.postAddJob = async (req, res) => {
    try {
        await Job.create(req.body);
        res.redirect('/jobs');
    } catch (error) { res.status(500).send(error.message); }
};

// --- 3. JOB ASSIGNMENTS (Complex: Needs Dropdowns) ---
exports.getAddAssignment = async (req, res) => {
    try {
        const employees = await Employee.findAll();
        const jobs = await Job.findAll();
        res.render('addAssignment', { employees, jobs });
    } catch (error) { res.status(500).send(error.message); }
};

exports.postAddAssignment = async (req, res) => {
    try {
        await JobAssignment.create(req.body);
        res.redirect('/assignments');
    } catch (error) { res.status(500).send(error.message); }
};

// --- 4. TRAINING PROGRAMS ---
exports.getAddTraining = (req, res) => {
    res.render('addTraining');
};

exports.postAddTraining = async (req, res) => {
    try {
        await TrainingProgram.create(req.body);
        res.redirect('/training');
    } catch (error) { res.status(500).send(error.message); }
};

// --- 5. PERFORMANCE CYCLES ---
exports.getAddCycle = (req, res) => {
    res.render('addPerformanceCycle');
};

exports.postAddCycle = async (req, res) => {
    try {
        await PerformanceCycle.create(req.body);
        res.redirect('/performance');
    } catch (error) { res.status(500).send(error.message); }
};

// --- 6. APPRAISALS (Complex: Needs Cycles & Assignments) ---
exports.getAddAppraisal = async (req, res) => {
    try {
        const cycles = await PerformanceCycle.findAll();
        // Get assignments with Employee names so we know who we are grading
        const assignments = await JobAssignment.findAll({
            include: [{ model: Employee }, { model: Job }]
        });
        res.render('addAppraisal', { cycles, assignments });
    } catch (error) { res.status(500).send(error.message); }
};

exports.postAddAppraisal = async (req, res) => {
    try {
        await Appraisal.create(req.body);
        res.redirect('/performance');
    } catch (error) { res.status(500).send(error.message); }
};
// --- 9. APPEALS (Linked to Appraisal) ---

// Show the form (We pass the Appraisal_ID from the URL)
exports.getAddAppeal = (req, res) => {
    const appraisalID = req.params.id; // Get ID from the link
    res.render('addAppeal', { appraisalID });
};

// Save the appeal
exports.postAddAppeal = async (req, res) => {
    try {
        await Appeal.create({
            Appraisal_ID: req.body.Appraisal_ID,
            Reason: req.body.Reason,
            Submission_Date: req.body.Submission_Date,
            Approval_Status: 'Pending' // Default status
        });
        res.redirect('/performance');
    } catch (error) {
        res.status(500).send("Error filing appeal: " + error.message);
    }
};
// controllers/maincontroller.js

// ... (your other exports are here)

// --- ADD NEW EMPLOYEE FUNCTIONS ---

// 1. GET: Show the form
exports.getAddEmployeePage = (req, res) => {
    res.render('addEmployee'); // This looks for views/addEmployee.ejs
};

// 2. POST: Save the data
exports.postAddEmployee = async (req, res) => {
    try {
        await Employee.create(req.body);
        res.redirect('/');
    } catch (error) {
        console.error("Error adding employee:", error);
        res.status(500).send("Error: " + error.message);
    }
};