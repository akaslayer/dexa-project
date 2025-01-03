const express = require('express');
const { authenticateToken } = require('../middleware/authMiddleware.js'); 
const UserController = require('../controller/users.js');

const router = express.Router();


router.get('/',UserController.getAllEmployee);
router.get('/profile',authenticateToken,UserController.getEmployeeProfile);
router.post('/',UserController.createNewEmployee);
router.patch('/',UserController.updateEmployee);


module.exports = router;