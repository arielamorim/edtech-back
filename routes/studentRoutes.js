const express = require('express');
const studentController = require('../controllers/studentController');

const router = express.Router()

// Create 
router.post('/create', studentController.createStudent )

// Get
router.get('/', studentController.getStudents )

// Get by params
router.get('/search', studentController.getStudentByParams )

// Get by id
router.get('/:id', studentController.getStudentById )

// Update by id
router.put('/update/:id', studentController.updateStudent )

// Delete
router.post('/delete/:id', studentController.deleteStudent )

module.exports = router;