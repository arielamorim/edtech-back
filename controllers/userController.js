
require('dotenv').config();

const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Create
const userCreate = async (req, res) => {
    try {
        // pass hash 
        req.body.password = await bcrypt.hashSync(req.body.password, 10);
        const user = await User.create( req.body )

        res.json( user )
    } catch ( e ) {
        console.log("Error creating user:", e)
        res.status(500).json({ error: 'Error creating user'})
    }

}


// Read
const userList = async (req, res) => {
    /* #swagger.security = [{
        "apiKeyAuth": []
    }] */

    try{

        const users = await User.findAll() 
        res.json( users )

    } catch ( e ) {
        console.log("Error fetching users:", e)
        res.status(500).json({ error: 'Error fetching users'})
    }
    
}

// Update
const userUpdate = async (req, res) => {
    /* #swagger.security = [{
        "apiKeyAuth": []
    }] */
    try {

        const { id } = req.params
        const { username, email, password } = req.body

        const result = await User.update(
            { username, email, password },
            { where: { id }, returning: true }
        )

        if (result.rowsUpdated === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(updatedStudent);

    } catch ( e ) {
        console.log("Error updating users:", e)
        res.status(500).json({ error: 'Error updating users'})
    }
}

// Delete
const userDelete = async (req, res) => {
    /* #swagger.security = [{
        "apiKeyAuth": []
    }] */
    try {

        const { id } = req.params

        const result = await User.update(
            { active: 0 },
            { where: { id }, returning: true }
        )

        if (result.rowsUpdated === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(updatedStudent);

    } catch ( e ) {
        console.log("Error updating users:", e)
        res.status(500).json({ error: 'Error updating users'})
    }
}

// Login
const userLogin = async (req, res) => {
    
    const result = await User.findOne({ where: { username: req.body.username }})
    
    if( result && bcrypt.compareSync( req.body.password, result.password )) {
        
        const token = jwt.sign({
            auth: {
                id: result._id
            }},
            process.env.SECRET, {expiresIn: "1h"});

        res.send({token});
    } else {
        res.send('Failed to login');
    }
}

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Failed to authenticate token' });
        }
        return res.status(200).json({ message: 'Token is valid!', userId: decoded.auth.id });
    });
};

module.exports = {
    userDelete,
    userUpdate,
    userList,
    userCreate,
    userLogin,
    verifyToken
}