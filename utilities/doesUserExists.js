const sequelize = require('./sequelizeConfig');

module.exports = async function doesUserExists(req, res, next) {
    await sequelize.findOne({where: {username : req.body.username}})
    .then(user => {
        req.foundUser = user;
        next()})
    .catch(() => {
        res.send('User not found');
    });
}