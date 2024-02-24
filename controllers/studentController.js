const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Student = require('../models/Student')
const helper = require('../utils/helper')

// Create 
const createStudent = async (req, res) => {
    try{

        const { name, email, cpf, ra } = req.body
        const student = await Student.create({ name, email, cpf, ra })
        console.log("Student ->", student)

        res.json( student )

    } catch ( e ) {
        console.log("Error creating student:", e)
        res.status(500).json({ error: 'Error creating student'})
    }
}

const getStudents = async (req, res) => {
    try{
        const students = await Student.findAll()
        res.json( students )
    } catch ( e ) {
        console.log("Error fetching student:", e)
        res.status(500).json({ error: 'Error fetching student'})
    }
}

const getStudentById = async (req, res) => {
    try{

        const where = helper.buildQuery( req.query )

        const students = await Student.findAll({ where })
        res.json( students )
    } catch ( e ) {
        console.log("Error searching students:", e)
        res.status(500).json({ error: 'Error searching students'})
    }
}

module.exports = { 
    createStudent,
    getStudents,
    getStudentById
}