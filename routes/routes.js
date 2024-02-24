const express = require('express');

// Initialize Router
const router = express.Router()
const studentRoutes = require('./studentRoutes')
const userRoutes = require('./userRoutes')

// Students
router.use('/student', studentRoutes) 

// Users
router.use('/user', userRoutes)

module.exports = router;