function inputValidation(req, res, next) {
    let { id, first_name, last_name, password } = req.body;
    //use RegExp for a stronger validation
    if (id == '' || id == undefined ||
        first_name == '' || first_name == undefined ||
        last_name == '' || last_name == undefined ||
        password == '' || password == undefined)
        res.sendStatus(422);
    else next();
}

module.exports = inputValidation;