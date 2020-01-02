const addUser = require('../routes/addUser');
const login = require('../routes/login');
// const updateUser = require('./routes/updateUser');
// const getUserDetails = require('./routes/getUserDetails');
// const deleteUser = require('./routes/deleteUser');
module.exports = (app) => {
    app.use('/user', addUser);    
    app.use('/user', login);
    // app.use('/user', updateUser);
    // app.use('/user', getUserDetails);
    // app.use('/user', deleteUser);
}