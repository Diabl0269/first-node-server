const sequelize = require('../utilities/sequelizeConfig');
const generateSalt = require('../cyrpt/salt');
const generateHash = require('../cyrpt/createHash');

module.exports = async function addUser(req, res, next) {
    const userDetails = req.body;
    userDetails.salt = generateSalt();
    userDetails.hash = generateHash(userDetails.password + userDetails.salt);
    await sequelize.create(userDetails).then(res.message = 'User added successfully').catch(() => res.message = 'An error has occured');
    next();
}