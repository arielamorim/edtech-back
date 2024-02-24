const express = require('express');
const studentController = require('../controllers/studentController');

const router = express.Router()

// Create 
router.post('/create', studentController.createStudent )

// Get
router.get('/', studentController.getStudents )

// Get by id
router.get('/search', studentController.getStudentById )

module.exports = router;