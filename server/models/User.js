    // models/User.js
    const mongoose = require('mongoose');

    const userSchema = new mongoose.Schema({
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
        verified: {
            type: Boolean,
            default: false, // Default value is false, indicating the user is not verified
        },
    }, {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
    });

    const User = mongoose.model('User', userSchema);
    module.exports = User;
