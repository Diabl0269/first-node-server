const express = require('express');
const router = express.Router();
const sequelize = require('../utilities/sequelizeConfig');
const createToken = require('../utilities/cyrpt/createToken');

router.post('/login', createToken, (req, res) => {
    console.log('logging in');
    
    
})