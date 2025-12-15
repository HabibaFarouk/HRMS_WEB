// controllers/mainController.js
const Employee = require('../models/Employee');
const University = require('../models/University');
const Faculty = require('../models/Faculty');
const Department = require('../models/Department');
const Job = require('../models/Job');
const JobAssignment = require('../models/JobAssignment');

// Helper to safely fetch data (prevents crashing if table is empty/missing)
const safeFetch = async (Model) => {
    try {
        return Model ? await Model.findAll() : [];
    } catch (e) {
        console.error(`Error fetching data:`, e);
        return [];
    }
};

exports.getEmployees = async (req, res) => {
    const data = await safeFetch(Employee);
    res.render('employee', { pageTitle: 'Employees', employees: data });
};

exports.getUniversities = async (req, res) => {
    const data = await safeFetch(University);
    res.render('universities', { pageTitle: 'Universities', universities: data });
};

exports.getFaculties = async (req, res) => {
    const data = await safeFetch(Faculty);
    res.render('faculties', { pageTitle: 'Faculties', faculties: data });
};

exports.getDepartments = async (req, res) => {
    const data = await safeFetch(Department);
    res.render('departments', { pageTitle: 'Departments', departments: data });
};

exports.getJobs = async (req, res) => {
    const data = await safeFetch(Job);
    res.render('jobs', { pageTitle: 'Jobs', jobs: data });
};

exports.getAssignments = async (req, res) => {
    const data = await safeFetch(JobAssignment);
    res.render('assignments', { pageTitle: 'Job Assignments', assignments: data });
};
// --- ADD EMPLOYEE LOGIC ---

// 1. Show the "Add Employee" Form
exports.getAddEmployee = async (req, res) => {
    res.render('addEmployee', { 
        pageTitle: 'Add New Employee'
    });
};

// 2. Handle the Form Submission (Save to DB)
exports.postAddEmployee = async (req, res) => {
    try {
        console.log("Form Data:", req.body);

        const { First_Name, Last_Name, Email, Phone_Number, Hire_Date, Employment_Status } = req.body;

        await Employee.create({
            First_Name: First_Name,
            Last_Name: Last_Name,
            Work_Email: Email, 
            
            // MAP THE FORM DATA TO THE DATABASE COLUMN
            Mobile_Phone: Phone_Number, 
            
            Hire_Date: Hire_Date,
            Employment_Status: Employment_Status
        });

        console.log("Success! Employee saved.");
        res.redirect('/employees');
    } catch (error) {
        console.error("Error adding employee:", error);
        res.send("Error adding employee. Check terminal for details.");
    }
};