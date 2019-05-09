const bcrypt = require('bcryptjs');

module.exports = {
    encrypt(pass) {
        return bcrypt.hashSync(pass, 9);
    },
    decrypt(pass, hash) {
        return bcrypt.compareSync(pass, hash);
    }
}