const port = 5000;
const express = require('express');
const bodyParser = require('body-parser'); 
const app = express();
const userManager = require('./usersManager');
const jwt = require('jsonwebtoken');
const verifyToken = require('./utilities/verifyToken');
app.use(bodyParser.json()); 
require('./server_init')(app);

//get a user by id
app.get('/user/:userId/details', verifyToken, (req, res) => {
    const userId = req.params.userId;
    jwt.verify(req.token, `${userId}`, (err, authData) => {
        if (err) res.sendStatus(403);
        else {
             userManager.getUserByID(userId).then((userDetails) => {
                let responseObj = {};
                if (!userDetails) {
                    res.statusCode = 403;
                    responseObj.data = null;
                    responseObj.error = 'user not found';
                }
                else {
                    responseObj.data = userDetails;
                    responseObj.error = null;
                }
                responseObj = JSON.stringify(responseObj);
                res.send(responseObj);
            })
        }
    })
});

app.post('/user/details/update', (req, res) => {
    console.log('Here');
    
    jwt.verify(req.token, `${req.body.id}`, (err, authData) => {
        if (err) res.sendStatus(403);
        else {
            const userDetails = req.body;
            userManager.changeDetails(userDetails).then((userDetails) => {
                res.send(JSON.stringify(userDetails));
            }).catch(e => res.send(JSON.stringify(e)));
        };
    })
});

//add a user
// app.post('/user/details/add', inputValidation, (req, res) => {
//     const userDetails = req.body;
//     userManager.addUser(userDetails).then((userDetails) => {
//         res.send(JSON.stringify(userDetails));
//     });
// });

//Login - get a user by id and password and return jwt
app.post('/api/login', (req, res) => {
    const userIdAndPassword = req.body;
    let userDetails = userManager.login(userIdAndPassword).then((userDetails) => {
        let responseObj = {};
        if (!userDetails) {
            res.statusCode = 403;
            responseObj.data = null;
            responseObj.error = 'user not found';
            res.send(JSON.stringify(responseObj));
        }
        else {
            if (userDetails.delete_date)
                res.send(`User deleted on ${userDetails.delete_date}`);
            jwt.sign({ userDetails }, `${userDetails.id}`, { expiresIn: '120s' }, (err, token) => {
                res.json(token);
            })
        };
    });

});

app.put('/user/:userId/delete', verifyToken, (req, res) => {
    jwt.verify(req.token, `${req.params.userId}`, (err, authData) => {
        if (err) res.sendStatus(403);
        else {
            const userId = req.params.userId;
            userManager.deleteRecord(userId).then((userId) => {
                res.send('user deleted');
            }).catch(e => res.send(JSON.stringify(e)));
        };
    });
});

//start the server on port 3000
app.listen(port, () => {
    console.log(`The server is running on port ${port}`);
});