const jwt = require('../helpers/jwt'),
    User = require('../models/user');

module.exports = function(req, res, next) {
    try {
        let decoded = jwt.verify(req.headers.token);
        User
            .findOne({
                email: decoded.userEmail
            })
            .then(user => {
                if (user) {
                    req.decoded = decoded;
                    next()
                } else {
                    throw { message: 'Email tidak ditemukan' }
                }
            })
            .catch(err => {
                console.log(err);
                res
                    .status(404)
                    .json({ msg: err.message })
            })

    } catch (error) {
        console.log(error);
        throw 'Token salah'
    }
}