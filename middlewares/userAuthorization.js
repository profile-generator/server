const User = require('../models/user');

module.exports = function(req, res, next) {
    Articles
        .findById(req.params.id)
        .then(Articles => {
            if (Articles) {
                if (Articles.author == req.decoded.userId) {
                    next();
                } else {
                    throw { message: `Not authorize` }
                }
            } else {
                throw { message: `Not found` }
            }
        })
        .catch(err => {
            console.log(err);
            if (err.message) {
                res.json(err)
            } else {
                res
                    .status(500)
                    .json(err)
            }
        })

    if (req.decoded.userId === req.params.id) {
        next()
    } else {
        throw { message: `Not authorize` }
    }
}