const express = require('express');
const inputValidation = require('../utilities/inputValidation');
const router = express.Router();
const sequelize = require('../utilities/sequelizeConfig');
const generateSalt = require('../utilities/cyrpt/salt');
const generateHash = require('../utilities/cyrpt/createHash');

router.post('/addUser', inputValidation, (req, res) => {
    console.log('adding a user');
    const userDetails = req.body;
    userDetails.salt = generateSalt();
    userDetails.hash = generateHash(userDetails.password + userDetails.salt);
    sequelize.create(userDetails).then(result => res.send(result)).catch(err => res.send(err));
});

module.exports = router;