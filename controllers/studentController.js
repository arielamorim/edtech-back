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
        const students = await Student.findAll({ where: {active: 1}})
        res.json( students )
    } catch ( e ) {
        console.log("Error fetching student:", e)
        res.status(500).json({ error: 'Error fetching student'})
    }
}

const getStudentByParams = async (req, res) => {
    try{

        const where = helper.buildQuery( req.query )

        const students = await Student.findAll({ where })
        res.json( students )
    } catch ( e ) {
        console.log("Error searching students:", e)
        res.status(500).json({ error: 'Error searching students'})
    }
}

const getStudentById = async (req, res) => {
    try{

        const { id } = req.params

        const student = await Student.findByPk( id )
        res.json( student )

    } catch ( e ) {
        console.log("Error searching student:", e)
        res.status(500).json({ error: 'Error searching student'})
    }
}

const updateStudent = async (req, res) => {
    /* #swagger.security = [{
        "apiKeyAuth": []
    }] */
    try {
        
        const { id } = req.params
        const { name, email, cpf, ra, active } = req.body

        const result = await Student.update(
            { name, email, ra, cpf, active },
            { where: { id }, returning: true }
        )
        
        const rowsUpdated = result[1]

        if ( rowsUpdated === 0 ) {
            return res.status(404).json({ error: 'Student not found' });
        }

        const updatedStudent = await Student.findByPk(id)

        res.json({ updatedStudent });

    } catch ( e ) {
        console.log("Error updating students:", e)
        res.status(500).json({ error: 'Error updating students'})
    }
}

const deleteStudent = async (req, res) => {
    /* #swagger.security = [{
        "apiKeyAuth": []
    }] */
    try {
        
        const { id } = req.params
        
        const result = await Student.update(
            { active: 0 },
            { where: { id }, returning: true }
        )
        
        const rowsUpdated = result[1]

        if ( rowsUpdated === 0 ) {
            return res.status(404).json({ error: 'Student not found' });
        }

        const updatedStudent = await Student.findByPk(id)

        res.json({ updatedStudent });

    } catch ( e ) {
        console.log("Error updating students:", e)
        res.status(500).json({ error: 'Error updating students'})
    }
}

module.exports = { 
    createStudent,
    getStudents,
    getStudentById,
    getStudentByParams,
    updateStudent,
    deleteStudent
}