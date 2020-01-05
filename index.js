const port = 5000;
const express = require('express');
const bodyParser = require('body-parser'); 
const app = express();
app.use(bodyParser.json()); 
require('./utilities/server_init')(app);

//start the server on port 5000
app.listen(port, () => {
    console.log(`The server is running on port ${port}`);
});