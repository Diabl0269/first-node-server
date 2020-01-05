const crypto = require('crypto');
module.exports = function generateHash(toHash) {    
    return crypto.createHash('sha256').update(toHash, 'utf8').digest('hex');
}