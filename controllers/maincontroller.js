// controllers/maincontroller.js
const { 
    Employee, Department, Job, JobAssignment, 
    TrainingProgram, PerformanceCycle, Appraisal, Appeal 
} = require('../models');

// =========================================================
// SECTION A: READ (GET PAGES)
// =========================================================

// 1. Dashboard (Employees)
exports.getDashboard = async (req, res) => {
    try {
        const employees = await Employee.findAll({ limit: 50 });
        res.render('dashboard', { pageTitle: 'HR System Dashboard', employees });
    } catch (error) { res.status(500).send(error.message); }
};

// 2. Departments
exports.getDepartments = async (req, res) => {
    try {
        const departments = await Department.findAll();
        res.render('department', { pageTitle: 'Department Directory', departments });
    } catch (error) { res.status(500).send(error.message); }
};

// 3. Jobs
exports.getJobs = async (req, res) => {
    try {
        const jobs = await Job.findAll();
        res.render('job', { pageTitle: 'Job Positions', jobs });
    } catch (error) { res.status(500).send(error.message); }
};

// 4. Assignments
exports.getJobAssignments = async (req, res) => {
    try {
        const assignments = await JobAssignment.findAll({
            include: [{ model: Employee }, { model: Job }]
        });
        res.render('jobassignment', { pageTitle: 'Job Assignments', assignments });
    } catch (error) { res.status(500).send(error.message); }
};

// 5. Training
exports.getTrainingPrograms = async (req, res) => {
    try {
        const programs = await TrainingProgram.findAll();
        res.render('trainingprogram', { pageTitle: 'Training Programs', programs });
    } catch (error) { res.status(500).send(error.message); }
};

// 6. Performance
exports.getPerformance = async (req, res) => {
    try {
        const appraisals = await Appraisal.findAll({
            include: [
                { model: PerformanceCycle },
                { model: Appeal },
                { model: JobAssignment, include: [{ model: Employee }] }
            ]
        });
        res.render('performance', { pageTitle: 'Performance Appraisals', appraisals });
    } catch (error) { res.status(500).send(error.message); }
};

// =========================================================
// SECTION B: CREATE (SHOW FORMS & SAVE DATA)
// =========================================================

// Employees
exports.getAddEmployeePage = (req, res) => res.render('addEmployee');
exports.postAddEmployee = async (req, res) => {
    try { await Employee.create(req.body); res.redirect('/'); } 
    catch (error) { res.status(500).send(error.message); }
};

// Departments
exports.getAddDepartment = (req, res) => res.render('addDepartment');
exports.postAddDepartment = async (req, res) => {
    try { await Department.create(req.body); res.redirect('/departments'); } 
    catch (error) { res.status(500).send(error.message); }
};

// Jobs
exports.getAddJob = (req, res) => res.render('addJob');
exports.postAddJob = async (req, res) => {
    try { await Job.create(req.body); res.redirect('/jobs'); } 
    catch (error) { res.status(500).send(error.message); }
};

// Assignments
exports.getAddAssignment = async (req, res) => {
    const employees = await Employee.findAll();
    const jobs = await Job.findAll();
    res.render('addAssignment', { employees, jobs });
};
exports.postAddAssignment = async (req, res) => {
    try { await JobAssignment.create(req.body); res.redirect('/assignments'); } 
    catch (error) { res.status(500).send(error.message); }
};

// Training
exports.getAddTraining = (req, res) => res.render('addTraining');
exports.postAddTraining = async (req, res) => {
    try { await TrainingProgram.create(req.body); res.redirect('/training'); } 
    catch (error) { res.status(500).send(error.message); }
};

// Performance Cycle
exports.getAddCycle = (req, res) => res.render('addPerformanceCycle');
exports.postAddCycle = async (req, res) => {
    try { await PerformanceCycle.create(req.body); res.redirect('/performance'); } 
    catch (error) { res.status(500).send(error.message); }
};

// Appraisals
exports.getAddAppraisal = async (req, res) => {
    const cycles = await PerformanceCycle.findAll();
    const assignments = await JobAssignment.findAll({ include: [{ model: Employee }, { model: Job }] });
    res.render('addAppraisal', { cycles, assignments });
};
exports.postAddAppraisal = async (req, res) => {
    try { await Appraisal.create(req.body); res.redirect('/performance'); } 
    catch (error) { res.status(500).send(error.message); }
};

// Appeals
exports.getAddAppeal = (req, res) => res.render('addAppeal', { appraisalID: req.params.id });
exports.postAddAppeal = async (req, res) => {
    try {
        await Appeal.create({
            Appraisal_ID: req.body.Appraisal_ID,
            Reason: req.body.Reason,
            Submission_Date: req.body.Submission_Date,
            Approval_Status: 'Pending'
        });
        res.redirect('/performance');
    } catch (error) { res.status(500).send(error.message); }
};

// =========================================================
// SECTION C: UPDATE (EDIT DATA)
// =========================================================

// 1. Edit Employee
exports.getEditEmployeePage = async (req, res) => {
    try {
        const emp = await Employee.findByPk(req.params.id);
        res.render('editEmployee', { emp });
    } catch (error) { res.status(500).send(error.message); }
};
exports.postEditEmployee = async (req, res) => {
    try {
        await Employee.update(req.body, { where: { Employee_ID: req.body.Employee_ID } });
        res.redirect('/');
    } catch (error) { res.status(500).send(error.message); }
};

// 2. Edit Department
exports.getEditDepartment = async (req, res) => {
    try {
        const dept = await Department.findByPk(req.params.id);
        res.render('editDepartment', { dept });
    } catch (error) { res.status(500).send(error.message); }
};
exports.postEditDepartment = async (req, res) => {
    try {
        await Department.update(req.body, { where: { Department_ID: req.body.Department_ID } });
        res.redirect('/departments');
    } catch (error) { res.status(500).send(error.message); }
};

// 3. Edit Job
exports.getEditJob = async (req, res) => {
    try {
        const job = await Job.findByPk(req.params.id);
        res.render('editJob', { job });
    } catch (error) { res.status(500).send(error.message); }
};
exports.postEditJob = async (req, res) => {
    try {
        await Job.update(req.body, { where: { Job_ID: req.body.Job_ID } });
        res.redirect('/jobs');
    } catch (error) { res.status(500).send(error.message); }
};

// 4. Edit Assignment
exports.getEditAssignment = async (req, res) => {
    try {
        const assign = await JobAssignment.findByPk(req.params.id);
        const employees = await Employee.findAll();
        const jobs = await Job.findAll();
        res.render('editAssignment', { assign, employees, jobs });
    } catch (error) { res.status(500).send(error.message); }
};
exports.postEditAssignment = async (req, res) => {
    try {
        await JobAssignment.update(req.body, { where: { Assignment_ID: req.body.Assignment_ID } });
        res.redirect('/assignments');
    } catch (error) { res.status(500).send(error.message); }
};

// 5. Edit Training
exports.getEditTraining = async (req, res) => {
    try {
        const prog = await TrainingProgram.findByPk(req.params.id);
        res.render('editTraining', { prog });
    } catch (error) { res.status(500).send(error.message); }
};
exports.postEditTraining = async (req, res) => {
    try {
        await TrainingProgram.update(req.body, { where: { Program_ID: req.body.Program_ID } });
        res.redirect('/training');
    } catch (error) { res.status(500).send(error.message); }
};

// 6. Edit Performance Cycle
exports.getEditCycle = async (req, res) => {
    try {
        const cycle = await PerformanceCycle.findByPk(req.params.id);
        res.render('editPerformanceCycle', { cycle });
    } catch (error) { res.status(500).send(error.message); }
};
exports.postEditCycle = async (req, res) => {
    try {
        await PerformanceCycle.update(req.body, { where: { Cycle_ID: req.body.Cycle_ID } });
        res.redirect('/performance');
    } catch (error) { res.status(500).send(error.message); }
};

// =========================================================
// SECTION D: DELETE (REMOVE DATA)
// =========================================================

exports.deleteEmployee = async (req, res) => {
    try {
        await Employee.destroy({ where: { Employee_ID: req.body.Employee_ID } });
        res.redirect('/');
    } catch (error) { res.status(500).send(error.message); }
};

exports.deleteDepartment = async (req, res) => {
    try {
        await Department.destroy({ where: { Department_ID: req.body.Department_ID } });
        res.redirect('/departments');
    } catch (error) { res.status(500).send(error.message); }
};

exports.deleteJob = async (req, res) => {
    try {
        await Job.destroy({ where: { Job_ID: req.body.Job_ID } });
        res.redirect('/jobs');
    } catch (error) { res.status(500).send(error.message); }
};

exports.deleteAssignment = async (req, res) => {
    try {
        await JobAssignment.destroy({ where: { Assignment_ID: req.body.Assignment_ID } });
        res.redirect('/assignments');
    } catch (error) { res.status(500).send(error.message); }
};

exports.deleteTraining = async (req, res) => {
    try {
        await TrainingProgram.destroy({ where: { Program_ID: req.body.Program_ID } });
        res.redirect('/training');
    } catch (error) { res.status(500).send(error.message); }
};
// controllers/maincontroller.js

// ... (existing code) ...

// --- 7. EDIT/DELETE APPRAISALS (NEW) ---

// Get the Edit Page
exports.getEditAppraisal = async (req, res) => {
    try {
        const appraisal = await Appraisal.findByPk(req.params.id, {
            include: [{ model: JobAssignment, include: [Employee] }]
        });
        const cycles = await PerformanceCycle.findAll();
        
        res.render('editAppraisal', { appraisal, cycles });
    } catch (error) { res.status(500).send(error.message); }
};

// Save Changes
exports.postEditAppraisal = async (req, res) => {
    try {
        await Appraisal.update(req.body, { where: { Appraisal_ID: req.body.Appraisal_ID } });
        res.redirect('/performance');
    } catch (error) { res.status(500).send(error.message); }
};

// Delete Appraisal
exports.deleteAppraisal = async (req, res) => {
    try {
        await Appraisal.destroy({ where: { Appraisal_ID: req.body.Appraisal_ID } });
        res.redirect('/performance');
    } catch (error) { res.status(500).send(error.message); }
};