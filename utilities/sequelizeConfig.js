const Sequelize = require('sequelize');
const sequelize = new Sequelize('users', 'admin', 'thed0ct0r', {
    host: 'firsteverdatabase.cho530xxnkme.us-east-2.rds.amazonaws.com',
    dialect : 'mysql'
})
const auto_sequelize = require('../models/drill');
module.exports = auto_sequelize(sequelize, Sequelize.DataTypes);

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });