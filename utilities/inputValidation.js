module.exports = function inputValidation(req, res, next) {
    let { username, first_name, last_name, password } = req.body;
    //use RegExp for a stronger validation
    if (first_name == '' || first_name == undefined ||
        last_name == '' || last_name == undefined ||
        password == '' || password == undefined ||
        username == '' || username == undefined)
        res.sendStatus(422);
    else next();
}