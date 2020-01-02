const jwt = require('jsonwebtoken');

module.exports = function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        jwt.verify(bearerToken, `${req.params.userId}`, (err, authData) => {
            if (err) return res.sendStatus(403);
            next();
        });
    }
    else res.sendStatus(403);
}