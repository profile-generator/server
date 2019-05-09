const jwt = require('jsonwebtoken');

module.exports = {
    sign(obj) {
        return jwt.sign(obj, process.env.JWT_SECRET);
    },
    verify(token) {
        return jwt.verify(token, process.env.JWT_SECRET);
    }
}