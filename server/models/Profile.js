// models/Profile.js
const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User', // Reference to the User model
    },
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
    phone_number: {
        type: String,
        maxlength: 20,
    },
    // Additional profile fields can be added here
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
});

const Profile = mongoose.model('Profile', profileSchema);
module.exports = Profile;
