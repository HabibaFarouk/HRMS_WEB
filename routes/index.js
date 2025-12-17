const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');

router.get('/', (req, res) => res.render('dashboard', { pageTitle: 'Dashboard' }));

// ORGANIZATION
router.get('/universities', mainController.getUniversities);
router.get('/add-university', mainController.getAddUniversity);
router.post('/add-university', mainController.postAddUniversity);
router.get('/edit-university/:id', mainController.getEditUniversity);
router.post('/edit-university', mainController.postEditUniversity);
router.post('/delete-university', mainController.deleteUniversity);

router.get('/faculties', mainController.getFaculties);
router.get('/add-faculty', mainController.getAddFaculty);
router.post('/add-faculty', mainController.postAddFaculty);
router.get('/edit-faculty/:id', mainController.getEditFaculty);
router.post('/edit-faculty', mainController.postEditFaculty);
router.post('/delete-faculty', mainController.deleteFaculty);

router.get('/departments', mainController.getDepartments);
router.get('/add-department', mainController.getAddDepartment);
router.post('/add-department', mainController.postAddDepartment);
router.get('/edit-department/:id', mainController.getEditDepartment);
router.post('/edit-department', mainController.postEditDepartment);
router.post('/delete-department', mainController.deleteDepartment);

// WORKFORCE
router.get('/employees', mainController.getEmployees);
router.get('/add-employee', mainController.getAddEmployee);
router.post('/add-employee', mainController.postAddEmployee);
router.get('/edit-employee/:id', mainController.getEditEmployee);
router.post('/edit-employee', mainController.postEditEmployee);
router.post('/delete-employee', mainController.deleteEmployee);

router.get('/jobs', mainController.getJobs);
router.get('/add-job', mainController.getAddJob);
router.post('/add-job', mainController.postAddJob);
router.get('/edit-job/:id', mainController.getEditJob);
router.post('/edit-job', mainController.postEditJob);
router.post('/delete-job', mainController.deleteJob);

router.get('/contracts', mainController.getContracts);
router.get('/add-contract', mainController.getAddContract);
router.post('/add-contract', mainController.postAddContract);
router.get('/edit-contract/:id', mainController.getEditContract);
router.post('/edit-contract', mainController.postEditContract);
router.post('/delete-contract', mainController.deleteContract);

router.get('/assignments', mainController.getAssignments);
router.get('/add-assignment', mainController.getAddAssignment);
router.post('/add-assignment', mainController.postAddAssignment);
router.get('/edit-assignment/:id', mainController.getEditAssignment);
router.post('/edit-assignment', mainController.postEditAssignment);
router.post('/delete-assignment', mainController.deleteAssignment);

// PERFORMANCE
router.get('/cycles', mainController.getCycles);
router.get('/add-cycle', mainController.getAddCycle);
router.post('/add-cycle', mainController.postAddCycle);
router.get('/edit-cycle/:id', mainController.getEditCycle);
router.post('/edit-cycle', mainController.postEditCycle);
router.post('/delete-cycle', mainController.deleteCycle);

router.get('/kpi', mainController.getKPI);
router.get('/add-kpi', mainController.getAddKPI);
router.post('/add-kpi', mainController.postAddKPI);
router.get('/edit-kpi/:id', mainController.getEditKPI);
router.post('/edit-kpi', mainController.postEditKPI);
router.post('/delete-kpi', mainController.deleteKPI);

router.get('/appraisals', mainController.getAppraisals);
router.get('/add-appraisal', mainController.getAddAppraisal);
router.post('/add-appraisal', mainController.postAddAppraisal);
router.get('/edit-appraisal/:id', mainController.getEditAppraisal);
router.post('/edit-appraisal', mainController.postEditAppraisal);
router.post('/delete-appraisal', mainController.deleteAppraisal);

router.post('/add-appeal', mainController.postAddAppeal);
router.get('/edit-appeal/:id', mainController.getEditAppeal);
router.post('/edit-appeal', mainController.postEditAppeal);
router.post('/delete-appeal', mainController.deleteAppeal);

module.exports = router;