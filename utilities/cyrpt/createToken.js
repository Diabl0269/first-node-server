const jwt = require('jsonwebtoken');
module.exports = function createToken(userDetails) {
    return jwt.sign({ userDetails }, `${userDetails.id}`, { expiresIn: '120s' })
};
