const bcrypt = require('bcrypt');

const hashPassword = async (req, res, next) => {
  console.log("hashPassword")
  try {
    // Check if the password is present in the request body
    if (!req.body.password) {
      return res.status(400).json({ error: 'Password is required' });
    }

    // Generate a salt
    const salt = await bcrypt.genSalt(10);

    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Replace the plaintext password with the hashed password in the request body
    req.body.password = hashedPassword;

    // Call the next middleware
    next();
  } catch (error) {
    console.error('Error hashing password:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {hashPassword};
