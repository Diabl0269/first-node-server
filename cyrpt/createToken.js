const jwt = require('jsonwebtoken');
module.exports = async function createToke(req, res, next) {
    res.token = await jwt.sign(req.body, `${req.body.username}`);
    next();
}
