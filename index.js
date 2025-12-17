const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const sequelize = require('./config/db'); 

// --- 1. IMPORT MODELS ---
// We need these to set up the relationships
const Employee = require('./models/Employee');
const University = require('./models/University');
const Faculty = require('./models/Faculty');
const Department = require('./models/Department');
const Job = require('./models/Job');
const JobAssignment = require('./models/JobAssignment');
const Contract = require('./models/Contract');
const PerformanceCycle = require('./models/PerformanceCycle');
const ObjectiveKPI = require('./models/ObjectiveKPI');
const Appraisal = require('./models/Appraisal');
const Appeal = require('./models/Appeal');

// --- 2. DEFINE ASSOCIATIONS (Crucial for avoiding crashes) ---
// This tells the database how tables are linked
JobAssignment.belongsTo(Employee, { foreignKey: 'Employee_ID' });
JobAssignment.belongsTo(Job, { foreignKey: 'Job_ID' });

Appraisal.belongsTo(JobAssignment, { foreignKey: 'Assignment_ID' });
Appraisal.hasMany(Appeal, { foreignKey: 'Appraisal_ID' });
Appeal.belongsTo(Appraisal, { foreignKey: 'Appraisal_ID' });

const app = express();

// --- 3. MIDDLEWARE ---
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// --- 4. IMPORT ROUTES (The Fix) ---
// We use './routes/index' because the folder is in the current directory
const mainRoutes = require('./routes/index'); 
app.use(mainRoutes);

// --- 5. START SERVER ---
sequelize
  .sync()
  .then(() => {
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
      console.log('http://localhost:3000');
    });
  })
  .catch(err => {
    console.log(err);
  });