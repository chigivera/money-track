// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        maxlength: 50,
    },
    lastname: {
        type: String,
        required: true,
        maxlength: 50,
    },
    city: {
        type: String,
        maxlength: 100,
    },
    country: {
        type: String,
        maxlength: 100,
    },
    zipcode: {
        type: String,
        maxlength: 20,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        maxlength: 100,
    },
    password: {
        type: String,
        required: true,
        minlength: 6, // Example minimum length for passwords
    },
    phone_number: {
        type: String,
        maxlength: 20,
    },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
