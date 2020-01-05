const sequelize = require('../utilities/sequelizeConfig');

module.exports = async function updateUser(req, res, next) {
    const userName = Object.values(req.body)[0];
    const change = Object.keys(req.body)[1];
    const changeTo = Object.values(req.body)[1];
    let changeObj = {};
    changeObj[change] = changeTo;
    await sequelize.update(changeObj, { where: { username: userName }}).then(result => console.log(result));
    next();
}