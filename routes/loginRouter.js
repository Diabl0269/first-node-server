const express = require('express');
const router = express.Router();
const createToken = require('../cyrpt/createToken');
const verifyHash = require('../cyrpt/verifyHash');
const doesUserExists = require('../utilities/doesUserExists');

module.exports = router.post('/login', doesUserExists, verifyHash, createToken, (req, res) => {
    console.log('Trying to log in');
    if(res.error) return res.send(res.error);
    res.status(400).json(res.token);
});