const express = require('express');
const inputValidation = require('../utilities/inputValidation');
const userManager = require('../usersManager');
const router = express.Router();

router.post('/addUser', inputValidation,(req, res) => {
    console.log('adding a user');
    
    const userDetails = req.body;
    userManager.addUser(userDetails).then((userDetails) => {
        res.send(JSON.stringify(userDetails));
    })
    .catch(err => console.log(err));
});

module.exports = router;