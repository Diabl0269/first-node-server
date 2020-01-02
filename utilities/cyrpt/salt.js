const crypto = require('crypto');
const saltLength = 32;
module.exports = function generateSalt() {
    return crypto.randomBytes(Math.ceil(saltLength)).toString('hex');
}