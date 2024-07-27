const bcrypt = require('bcrypt');
const User = require('../models/User'); // Adjust the import path to your User model

const comparePassword = async (req, res, next) => {
  console.log("Password comparison initiated");
  try {
    // Check if the email and password are present in the request body
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    console.log("Email and password are provided");

    // Find the user by email using Mongoose
    const user = await User.findOne({ email: req.body.email });

    // If no user is found, return an error
    if (!user) {
      console.log("User not found");
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    console.log("User found:", user);

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(req.body.password, user.password);

    // If the passwords match, attach the user object to the request
    if (isMatch) {
      console.log("Password match");
      req.user = user;
      next();
    } else {
      // Passwords do not match, return an error
      console.log("Password mismatch");
      return res.status(401).json({ error: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Error comparing passwords:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = comparePassword;