const generateHash = require('./createHash');
//can only work after finding a user using 'doesUserExists'
module.exports = async function verifyHash(req, res, next) {
    const userDetails = req.body;
    userDetails.hash = generateHash(userDetails.password + req.foundUser.salt);
    if (userDetails.hash !== req.foundUser.hash)
        res.error = 'Incorrect password';
    next();
}