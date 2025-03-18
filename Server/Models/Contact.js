const mongoose = require('mongoose');
const jwt = require('jsonwebtoken'); // Import jwt

const ContactSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    phone: String,
    comment: String,
    createdAt: { type: Date, default: Date.now } // Corrected typo
});

// Define the method on the schema
ContactSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, 'dfgdfgf', { expiresIn: '1h' });
    return token;
};

const User1 = mongoose.model('User1', ContactSchema);
module.exports = User1;
