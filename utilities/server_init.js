const addUserRouter = require('../routes/addUserRouter');
const loginRouter = require('../routes/loginRouter');
const updateRouter = require('../routes/updateRouter');
// const deleteUser = require('./routes/deleteUser');
module.exports = (app) => {
    app.use('/user', addUserRouter);    
    app.use('/user', loginRouter);
    app.use('/user', updateRouter);
    // app.use('/user', deleteUser);
}