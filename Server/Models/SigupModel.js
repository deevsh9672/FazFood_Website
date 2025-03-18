const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    password: String,
    firstname: String,
    lastname: String,
    createdAt: { type: Date, default: Date.now }
});

// Method to generate auth token


userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, 'dfgdfgf', { expiresIn: '1h' });
    return token;
};

// Method to compare password
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
