const Employee = require('../models/Employee');
const University = require('../models/University');
const Faculty = require('../models/Faculty');
const Department = require('../models/Department');
const Job = require('../models/Job');
const JobAssignment = require('../models/JobAssignment');
const Contract = require('../models/Contract');
const PerformanceCycle = require('../models/PerformanceCycle');
const ObjectiveKPI = require('../models/ObjectiveKPI');
const Appraisal = require('../models/Appraisal');
const Appeal = require('../models/Appeal');

// --- HELPER: Safely Fetch List ---
const safeFetch = async (Model, include = []) => {
    try { return Model ? await Model.findAll({ include }) : []; } 
    catch (e) { console.error(`Error:`, e); return []; }
};

// --- HELPER: Generate ID ---
const generateId = async (Model, primaryKey) => {
    const lastItem = await Model.findOne({ order: [[primaryKey, 'DESC']] });
    return lastItem ? lastItem[primaryKey] + 1 : 1;
};

// =========================================================
// 1. DASHBOARD & ORGANIZATION
// =========================================================
exports.getUniversities = async (req, res) => res.render('universities', { pageTitle: 'Universities', universities: await safeFetch(University) });
exports.getAddUniversity = (req, res) => res.render('addUniversity', { pageTitle: 'Add University' });
exports.postAddUniversity = async (req, res) => {
    try { const nextId = await generateId(University, 'University_ID'); await University.create({ University_ID: nextId, ...req.body }); res.redirect('/universities'); } catch (e) { res.send(e.message); }
};
exports.getEditUniversity = async (req, res) => res.render('editUniversity', { pageTitle: 'Edit University', uni: await University.findByPk(req.params.id) });
exports.postEditUniversity = async (req, res) => { await University.update(req.body, { where: { University_ID: req.body.University_ID } }); res.redirect('/universities'); };
exports.deleteUniversity = async (req, res) => { await University.destroy({ where: { University_ID: req.body.id } }); res.redirect('/universities'); };

exports.getFaculties = async (req, res) => res.render('faculties', { pageTitle: 'Faculties', faculties: await safeFetch(Faculty) });
exports.getAddFaculty = (req, res) => res.render('addFaculty', { pageTitle: 'Add Faculty' });
exports.postAddFaculty = async (req, res) => {
    try { const nextId = await generateId(Faculty, 'Faculty_ID'); await Faculty.create({ Faculty_ID: nextId, ...req.body }); res.redirect('/faculties'); } catch (e) { res.send(e.message); }
};
exports.getEditFaculty = async (req, res) => res.render('editFaculty', { pageTitle: 'Edit Faculty', faculty: await Faculty.findByPk(req.params.id) });
exports.postEditFaculty = async (req, res) => { await Faculty.update(req.body, { where: { Faculty_ID: req.body.Faculty_ID } }); res.redirect('/faculties'); };
exports.deleteFaculty = async (req, res) => { await Faculty.destroy({ where: { Faculty_ID: req.body.id } }); res.redirect('/faculties'); };

exports.getDepartments = async (req, res) => res.render('departments', { pageTitle: 'Departments', departments: await safeFetch(Department) });
exports.getAddDepartment = (req, res) => res.render('addDepartment', { pageTitle: 'Add Dept' });
exports.postAddDepartment = async (req, res) => {
    try { const nextId = await generateId(Department, 'Department_ID'); await Department.create({ Department_ID: nextId, ...req.body }); res.redirect('/departments'); } catch (e) { res.send(e.message); }
};
exports.getEditDepartment = async (req, res) => res.render('editDepartment', { pageTitle: 'Edit Department', dept: await Department.findByPk(req.params.id) });
exports.postEditDepartment = async (req, res) => { await Department.update(req.body, { where: { Department_ID: req.body.Department_ID } }); res.redirect('/departments'); };
exports.deleteDepartment = async (req, res) => { await Department.destroy({ where: { Department_ID: req.body.id } }); res.redirect('/departments'); };

// =========================================================
// 2. WORKFORCE
// =========================================================
exports.getEmployees = async (req, res) => res.render('employee', { pageTitle: 'Employees', employees: await safeFetch(Employee) });
exports.getAddEmployee = (req, res) => res.render('addEmployee', { pageTitle: 'Add Employee' });
exports.postAddEmployee = async (req, res) => {
    try {
        const nextId = await generateId(Employee, 'Employee_ID');
        await Employee.create({ Employee_ID: nextId, ...req.body, Employment_Status: req.body.Employment_Status || 'Active', Emergency_Contact_Name: 'Pending', Emergency_Contact_Phone: '0000', Emergency_Contact_Relationship: 'None', Residential_City: 'Cairo', Residential_Area: 'N/A', Residential_Street: 'N/A', Residential_Country: 'Egypt' });
        res.redirect('/employees');
    } catch (e) { res.send(e.message); }
};
exports.getEditEmployee = async (req, res) => res.render('editEmployee', { pageTitle: 'Edit Employee', emp: await Employee.findByPk(req.params.id) });
exports.postEditEmployee = async (req, res) => { await Employee.update(req.body, { where: { Employee_ID: req.body.Employee_ID } }); res.redirect('/employees'); };
exports.deleteEmployee = async (req, res) => { await Employee.destroy({ where: { Employee_ID: req.body.id } }); res.redirect('/employees'); };

exports.getJobs = async (req, res) => res.render('jobs', { pageTitle: 'Jobs', jobs: await safeFetch(Job) });
exports.getAddJob = (req, res) => res.render('addJob', { pageTitle: 'Add Job' });
exports.postAddJob = async (req, res) => { await Job.create(req.body); res.redirect('/jobs'); };
exports.getEditJob = async (req, res) => res.render('editJob', { pageTitle: 'Edit Job', job: await Job.findByPk(req.params.id) });
exports.postEditJob = async (req, res) => { await Job.update(req.body, { where: { Job_ID: req.body.Job_ID } }); res.redirect('/jobs'); };
exports.deleteJob = async (req, res) => { await Job.destroy({ where: { Job_ID: req.body.id } }); res.redirect('/jobs'); };

exports.getContracts = async (req, res) => res.render('contracts', { pageTitle: 'Contracts', contracts: await safeFetch(Contract) });
exports.getAddContract = (req, res) => res.render('addContract', { pageTitle: 'Add Contract' });
exports.postAddContract = async (req, res) => { try { const nextId = await generateId(Contract, 'Contract_ID'); await Contract.create({ Contract_ID: nextId, ...req.body }); res.redirect('/contracts'); } catch (e) { res.send(e.message); } };
exports.getEditContract = async (req, res) => res.render('editContract', { pageTitle: 'Edit Contract', contract: await Contract.findByPk(req.params.id) });
exports.postEditContract = async (req, res) => { await Contract.update(req.body, { where: { Contract_ID: req.body.Contract_ID } }); res.redirect('/contracts'); };
exports.deleteContract = async (req, res) => { await Contract.destroy({ where: { Contract_ID: req.body.id } }); res.redirect('/contracts'); };

exports.getAssignments = async (req, res) => {
    // Include Employee and Job models to get names
    const data = await safeFetch(JobAssignment, [Employee, Job]);
    res.render('assignments', { pageTitle: 'Assignments', assignments: data });
};
exports.getAddAssignment = async (req, res) => {
    const employees = await safeFetch(Employee);
    const jobs = await safeFetch(Job);
    res.render('addAssignment', { pageTitle: 'Add Assignment', employees, jobs });
};
exports.postAddAssignment = async (req, res) => { await JobAssignment.create(req.body); res.redirect('/assignments'); };
exports.getEditAssignment = async (req, res) => {
    const assign = await JobAssignment.findByPk(req.params.id);
    const employees = await safeFetch(Employee);
    const jobs = await safeFetch(Job);
    res.render('editAssignment', { pageTitle: 'Edit Assignment', assign, employees, jobs });
};
exports.postEditAssignment = async (req, res) => { 
    try {
        await JobAssignment.update(req.body, { where: { Assignment_ID: req.body.Assignment_ID } }); 
        res.redirect('/assignments');
    } catch (e) {
        res.send(`Error updating assignment: ${e.message}`);
    }
};
exports.deleteAssignment = async (req, res) => { await JobAssignment.destroy({ where: { Assignment_ID: req.body.id } }); res.redirect('/assignments'); };

// =========================================================
// 3. PERFORMANCE
// =========================================================
exports.getCycles = async (req, res) => res.render('cycles', { pageTitle: 'Performance Cycles', cycles: await safeFetch(PerformanceCycle) });
exports.getAddCycle = (req, res) => res.render('addCycle', { pageTitle: 'Add Cycle' });
exports.postAddCycle = async (req, res) => { const nextId = await generateId(PerformanceCycle, 'Cycle_ID'); await PerformanceCycle.create({ Cycle_ID: nextId, ...req.body }); res.redirect('/cycles'); };
exports.getEditCycle = async (req, res) => res.render('editPerformanceCycle', { pageTitle: 'Edit Cycle', cycle: await PerformanceCycle.findByPk(req.params.id) });
exports.postEditCycle = async (req, res) => { try { await PerformanceCycle.update(req.body, { where: { Cycle_ID: req.body.Cycle_ID } }); res.redirect('/cycles'); } catch (err) { res.status(400).send(`Error updating cycle: ${err.message}`); } };
exports.deleteCycle = async (req, res) => { await PerformanceCycle.destroy({ where: { Cycle_ID: req.body.id } }); res.redirect('/cycles'); };

exports.getKPI = async (req, res) => res.render('kpi', { pageTitle: 'KPIs', kpis: await safeFetch(ObjectiveKPI) });
exports.getAddKPI = (req, res) => res.render('addKPI', { pageTitle: 'Add KPI' });
exports.postAddKPI = async (req, res) => { await ObjectiveKPI.create(req.body); res.redirect('/kpi'); };
exports.getEditKPI = async (req, res) => res.render('editKPI', { pageTitle: 'Edit KPI', kpi: await ObjectiveKPI.findByPk(req.params.id) });
exports.postEditKPI = async (req, res) => { await ObjectiveKPI.update(req.body, { where: { KPI_ID: req.body.KPI_ID } }); res.redirect('/kpi'); };
exports.deleteKPI = async (req, res) => { await ObjectiveKPI.destroy({ where: { KPI_ID: req.body.id } }); res.redirect('/kpi'); };

exports.getAppraisals = async (req, res) => {
    const data = await Appraisal.findAll({
        include: [
            Appeal, // Get Appeals
            { 
                model: JobAssignment, 
                include: [Employee, Job] // Get Employee & Job Name via Assignment
            }
        ]
    });
    res.render('appraisals', { pageTitle: 'Appraisals', appraisals: data });
};
exports.getAddAppraisal = (req, res) => res.render('addAppraisal', { pageTitle: 'New Appraisal' });
exports.postAddAppraisal = async (req, res) => { await Appraisal.create(req.body); res.redirect('/appraisals'); };
exports.getEditAppraisal = async (req, res) => res.render('editAppraisal', { pageTitle: 'Edit Appraisal', appraisal: await Appraisal.findByPk(req.params.id) });
exports.postEditAppraisal = async (req, res) => { await Appraisal.update(req.body, { where: { Appraisal_ID: req.body.Appraisal_ID } }); res.redirect('/appraisals'); };
exports.deleteAppraisal = async (req, res) => { await Appraisal.destroy({ where: { Appraisal_ID: req.body.id } }); res.redirect('/appraisals'); };

exports.postAddAppeal = async (req, res) => { await Appeal.create({ Appraisal_ID: req.body.Appraisal_ID, Reason: req.body.Reason, Approval_Status: 'Pending', Submission_Date: new Date() }); res.redirect('/appraisals'); };
exports.getEditAppeal = async (req, res) => { const appeal = await Appeal.findByPk(req.params.id); res.render('editAppeal', { pageTitle: 'Edit Appeal', appeal: appeal }); };
exports.postEditAppeal = async (req, res) => { await Appeal.update({ Reason: req.body.Reason, Approval_Status: req.body.Approval_Status }, { where: { Appeal_ID: req.body.Appeal_ID } }); res.redirect('/appraisals'); };
exports.deleteAppeal = async (req, res) => { await Appeal.destroy({ where: { Appeal_ID: req.body.id } }); res.redirect('/appraisals'); };