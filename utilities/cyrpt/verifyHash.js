const crypto = require('crypto');
const sequelize = require('../sequelizeConfig');

module.exports = function verifyHash(userDetails) {
    const userName = userDetails.username;
    //find if the user exists, if so check if the hashes match
    sequelize.findOne()
}