const mongoose = require('mongoose');
const crypto = require('crypto');

const Users = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        maxlength: 100
    },
    password: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    salt: {
        type: String,
        required: true
    }
});

Users.methods.validatePassword = function(password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
};

Users.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

module.exports = mongoose.model('Users', Users);
