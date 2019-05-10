const user = require('../models/user'),
    { decrypt } = require('../helpers/bcrypt'),
    jwt = require('../helpers/jwt');




class User {
    static signUp(req, res) {
        user
            .create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                birthdate: req.body.birthdate,
                gender: req.body.gender,
                location: req.body.location,
                phoneNumber: req.body.phoneNumber,
                profileImage: req.file.cloudStoragePublicUrl,
            })
            .then(function(newUser) {
                res.status(201).json(newUser)
            })
            .catch(function(err) {
                console.log(err)
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

    static readOne(req, res) {
        user
            .findById(req.params.id)
            .populate('likes')
            .populate('likedBy')
            .then(user => {
                res.json(user);
            })
            .catch(err => {
                res
                    .status(500)
                    .json(err)
            })
    }

    static read(req, res) {
        user
            .find()
            .then(users => {
                res.json(users);
            })
            .catch(err => {
                res
                    .status(500)
                    .json(err)
            })
    }

    static like(req, res) {
        user
            .findByIdAndUpdate(req.params.id, {
                $push: {
                    likeBy: req.decoded.userId
                }
            }, {
                new: true,
                runValidators: false
            })
            .then(data => {
                console.log(req.params.id)
                return user
                    .findByIdAndUpdate(req.decoded.userId, {
                        $push: {
                            likes: req.params.id
                        }
                    }, {
                        new: true,
                        runValidators: false
                    })
            })
            .then(user => {
                res
                    .json(user)
            })
            .catch(err => {
                console.log(err)
                res
                    .status(500)
                    .json(err)
            })
    }

    static dislike(req, res) {
        user
            .findByIdAndUpdate(req.params.userId, {
                $pull: {
                    likeBy: req.decoded.userId
                }
            }, {
                new: true,
                runValidators: false
            })
            .then(data => {
                return user
                    .findByIdAndUpdate(req.decoded.userId, {
                        $pull: {
                            likes: req.params.userId
                        }
                    }, {
                        new: true,
                        runValidators: false
                    })
            })
            .then(user => {
                res
                    .json(user)
            })
            .catch(err => {
                res
                    .status(500)
                    .json(err)
            })
    }

    static update(req, res) {
        user
            .findByIdAndUpdate(req.params.id, {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                birthdate: req.body.birthdate,
                gender: req.body.gender,
                location: req.body.location,
                phoneNumber: req.body.phoneNumber,
            }, { new: true })
            .then(function(user) {
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
}

module.exports = User;