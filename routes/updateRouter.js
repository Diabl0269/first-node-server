const express = require('express');
const router = express.Router();
const doesUserExists = require('../utilities/doesUserExists');
const updateUser = require('../usersManager/updateUser');
const verifyToken = require('../cyrpt/verifyToken');

module.exports = router.post('/update', doesUserExists, verifyToken, updateUser,(req, res) => {
    res.send('User updated succesfully');
})