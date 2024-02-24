const { Sequelize } = require('sequelize');
// const Student = require('../models/Student')

// Initialize Sequelize
const sequelize = new Sequelize('edtech', 'admin', 'admin123', {
    host: 'localhost',
    dialect: 'mysql'
});

// Initialize models
// Student.initialize( sequelize );

// try {
//     await sequelize.authenticate();
//     console.log('Connection has been established successfully.');
// } catch (error) {
//     console.error('Unable to connect to the database:', error);
// }

module.exports = sequelize