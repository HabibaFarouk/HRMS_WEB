// models/index.js
const sequelize = require('../config/db');
const Employee = require('./Employee');
const Department = require('./Department');
const Job = require('./Job');
const JobAssignment = require('./JobAssignment');
const TrainingProgram = require('./TrainingProgram');
const PerformanceCycle = require('./PerformanceCycle'); // <--- NEW
const Appraisal = require('./Appraisal');             // <--- NEW
const Appeal = require('./Appeal');                   // <--- NEW

// --- Define Relationships ---

// 1. Job Assignment Links
JobAssignment.belongsTo(Employee, { foreignKey: 'Employee_ID' });
JobAssignment.belongsTo(Job, { foreignKey: 'Job_ID' });

// 2. Performance Links
// An Appraisal belongs to a Cycle (e.g., "2024 Annual Review")
Appraisal.belongsTo(PerformanceCycle, { foreignKey: 'Cycle_ID' });

// An Appraisal belongs to a specific Job Assignment (which links to the Employee)
Appraisal.belongsTo(JobAssignment, { foreignKey: 'Assignment_ID' });

// An Appeal belongs to an Appraisal
Appeal.belongsTo(Appraisal, { foreignKey: 'Appraisal_ID' });
Appraisal.hasOne(Appeal, { foreignKey: 'Appraisal_ID' }); // Use hasOne so we can fetch it easily

module.exports = {
    sequelize,
    Employee,
    Department,
    Job,
    JobAssignment,
    TrainingProgram,
    PerformanceCycle, // <--- Export
    Appraisal,        // <--- Export
    Appeal            // <--- Export
};