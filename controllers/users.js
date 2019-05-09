const user = require('../models/user'),
    { decrypt } = require('../helpers/bcrypt'),
    jwt = require('../helpers/jwt');




class User {
    static signUp(req, res) {

        user
            .create({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            })
            .then(function(newUser) {
                res.status(201).json(newUser)
            })
            .catch(function(err) {
                if (err.errors.email) {
                    res.status(400).json(err.errors.email.reason)
                } else if (err.errors.password) {
                    res.status(400).json(err.errors.password.reason)
                } else {
                    res.status(500).json(err)
                }
            })
    }

    static signIn(req, res) {
        user
            .findOne({
                email: req.body.email
            })
            .then(function(uLogin) {
                if (!uLogin) {
                    throw {
                        message: 'Username / password wrong'
                    }
                } else {
                    if (!decrypt(req.body.password, uLogin.password)) {
                        throw {
                            message: 'Username / password wrong'
                        }
                    } else {
                        let token = jwt.sign({
                            username: uLogin.username,
                            userEmail: uLogin.email,
                            userId: uLogin._id
                        })
                        let obj = {
                            token,
                            userId: uLogin._id,
                            username: uLogin.username
                        }
                        res.status(200).json(obj)
                    }
                }
            })
            .catch(function(err) {
                if (err.message) {
                    res.status(404).json(err.message)
                } else {
                    res.status(500).json(err)
                }
            })
    }
}

module.exports = User;