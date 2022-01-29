var express = require('express'); 
const { authAdmin, deleteAdmin, getAdminById, getAdmin, updateAdmin, createAdmin, getAllAdmins } = require('../controllers/admins.controller');

var router= express.Router(); 

router.post('/',createAdmin);
router.get('/', getAllAdmins);
router.post('/login', authAdmin);
router.get('/:id', getAdminById);
router.delete('/:id', deleteAdmin);
router.post('/:id', updateAdmin);
router.get('/profile', getAdmin)


module.exports = router ;