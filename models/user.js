const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    { encrypt } = require('../helpers/bcrypt')

const userSchema = new Schema({
    name: {
        type: 'string',
        required: true
    },
    birthdate: {
        type: 'date',
        required: true
    },
    gender: {
        type: 'string',
        required: true
    },
    location: {
        type: 'string',
        required: true
    },
    phoneNumber: {
        type: 'string',
        required: true
    },
    profileImage: 'string',
    profileCard: 'string',
    likedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    email: {
        type: 'string',
        required: true,
        validate: [{
            validator: function validateEmail(email) {
                var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(String(email).toLowerCase());
            },
            message: 'Email not valid'
        }, {
            validator: function uniqueEmail(email) {
                return new Promise((resolve, reject) => {
                    this.model('User').findOne({
                            email: email
                        })
                        .then(function(result) {
                            if (result) {
                                throw new Error('Email already exists')
                            } else {
                                resolve()
                            }
                        })
                        .catch(function(err) {
                            reject(err.message)
                        })
                })
            }
        }]
    },
    password: {
        type: 'string',
        minlength: [6, 'Minimal 6 digits'],
        required: true
    }
})

userSchema.pre('save', function(next) {
    this.password = encrypt(this.password)
    next()
})

const User = mongoose.model('User', userSchema)
module.exports = User