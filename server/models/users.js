const mongoose = require('mongoose');
const crypto = require('crypto');

const Users = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    maxlength: 150
  },
  password: {
    type: String,
    trim: true,
    maxlength: 128
  },
  salt: {
    type: String
  }
});

Users.methods.validatePassword = function(password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 64, 'sha512').toString('hex');
  return this.password === hash;
};

Users.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(32).toString('hex');
  this.password = crypto.pbkdf2Sync(password, this.salt, 10000, 64, 'sha512').toString('hex');
};

module.exports = mongoose.model('Users', Users);
