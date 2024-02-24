const express = require('express')
const userController = require('../controllers/userController')

// Initialize Router
const router = express.Router()

// List
router.get('/', userController.userList)

// Create 
router.post('/create', userController.userCreate)

// Login
router.post('/login', userController.userLogin)

// Delete
router.post('/delete', userController.userDelete)

// Verify token
router.get('/verifytoken', userController.verifyToken )

module.exports = router
