const express = require('express');
const inputValidation = require('../utilities/inputValidation');
const router = express.Router();
const addUser = require('../usersManager/addUser');

module.exports = router.post('/addUser', inputValidation, addUser, (req, res) => {
    res.send(res.message);
  });