const port = 3000;
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const userManager = require('./usersManager');
const jwt = require('jsonwebtoken');

app.use(bodyParser.json());

//get a user by id
app.get('/user/:userId/details', verifyToken, (req, res) => {
    const userId = req.params.userId;
    jwt.verify(req.token, `${userId}`, (err, authData) => {
        if (err) res.sendStatus(403);
        else {
            
            let userDetails = userManager.getUserByID(userId).then((userDetails) => {
                let responseObj = {};
                if (!userDetails) {
                    res.statusCode = 403;
                    responseObj.data = null;
                    responseObj.error = 'user not found'
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

app.post('/user/details/change/update', verifyToken, (req, res) => {
   console.log(req.body.id);
   
    jwt.verify(req.token, `${req.body.id}`, (err, authData) => {
        if (err) res.sendStatus(403);
        else {
            const userDetails = req.body;
            userManager.changeDetails(userDetails).then((userDetails) => {
                res.send(JSON.stringify(userDetails));
            });
        }
    })
});

//add a user
app.post('/user/details/add', inputValidation,(req, res) => {
    const userDetails = req.body;
    userManager.addUser(userDetails).then((userDetails) => {
        res.send(JSON.stringify(userDetails));
    });
});

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
            console.log(userDetails.id);
            
            jwt.sign({ userDetails }, `${userDetails.id}`, {expiresIn: '120s'}, (err, token) => {
                res.json(token);
            })
        };
    });

});

app.put('/user/:userId/delete', (req, res) => {
    const userId = req.params.userId;
    userManager.deleteRecord(userId).then((userId) =>{
        res.send('user deleted');
    });
});

//verify jwt to use in other functions
function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    }
    else {
        res.sendStatus(403);
    }
};

function inputValidation(req, res, next){
    let {id, first_name, last_name, password} = req.body;
    if(id == '' || id == undefined ||
        first_name == '' || first_name == undefined ||
        last_name == '' || last_name == undefined ||
        password == '' || password == undefined)
            res.sendStatus(403);
    else next();
}

//start the server on port 3000
app.listen(port, () => {
    console.log(`The server is running on port ${port}`);
});