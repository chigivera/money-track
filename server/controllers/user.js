const { v4: uuidv4 } = require("uuid");
const User = require('../models/User');
// const crypto = require('crypto');
const EmailVerificationPin = require('../models/EmailVerification');
const sendEmail = require('../utils/sendEmail');


const sendVerificationCode = async (req, res) => {
  try {
    const { email, pin } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (user) {
      return res.status(404).json({ error: 'email already exists' });
    }

    // Create a new email verification pin document
    const expirationTime = new Date(Date.now() + 30 * 60 * 1000); // Pin expires in 30 minutes
    const emailVerificationPin = await EmailVerificationPin.create({
      email,
      pin,
      expiration_time: expirationTime,
    });

    // Send the verification email
    await sendEmail(
      email,
      'Email Verification',
      `Your verification code is: ${pin}`
    );

    res.status(200).json({ message: 'Verification code sent to your email' });
  } catch (error) {
    console.error('Error sending verification code:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { email, pin } = req.body;

    // Find the email verification pin for the user
    const verificationPin = await EmailVerificationPin.findOne({ email });

    // Check if the pin is valid and not expired
    if (!verificationPin || verificationPin.pin !== pin || verificationPin.expiration_time < new Date()) {
      return res.status(400).json({ error: 'Invalid or expired verification pin' });
    }
    
    // Delete the used verification pin
    await EmailVerificationPin.findByIdAndDelete(verificationPin._id);

    // Send a success response
    return res.status(200).json({ message: 'Email verified successfully', user });
  } catch (error) {
    console.error('Error verifying email:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};




const login = async (req, res) => {
  console.log("Login process initiated");
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    // Correctly place the response sending inside the condition
    return res.status(200);
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const register = async (req, res) => {
  console.log("register")
  const { email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(500).json({ error: "user already exists" });

    const user = new User({
      email,
      password,
    });

    await user.save();
    return res.status(200).json({ message: "User registered successfully", user });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Failed to register user" });
  }
}

const logout = (req, res) => {
  try {
    req.headers['authorization'] = undefined;
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Error logging out user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// const createUser = async (req, res) => {
//   try {
//     const { email, password, firstname, lastname } = req.body;
//     const user = new User({
//       _id: uuidv4(),
//       firstname,
//       lastname,
//       email,
//       password,
//       isAdmin: false,
//       createdAt: new Date(),
//     });
//     await user.save();
//     res.json({ user });
//   } catch (error) {
//     console.error('Error creating user:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

// const updateUser = async (req, res) => {
//   console.log("updating user")
//   try {
//     const { userId } = req.params;
//     const { email, password, firstname, lastname } = req.body;
//     const user = await User.findByIdAndUpdate(userId, {
//       email,
//       password,
//       firstname,
//       lastname,
//     }, { new: true });
//     res.json({ user });
//   } catch (error) {
//     console.error('Error updating user:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

// const getUser = async (req, res) => {
//   try {
//     const { userId } = req.user
//     const admin = await User.findById(userId);
//     if (!admin.isAdmin) return res.status(400).json({ message: "You are not authorized to do this action" })
//     const users = await User.find();
//     res.json({ users });
//   } catch (error) {
//     console.error('Error getting users:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

// const getUserById = async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const user = await User.findById(userId);
//     res.json({ user });
//   } catch (error) {
//     console.error('Error getting user by ID:', error);
//     res.status(404).json({ error: 'User not found' });
//   }
// };

// const deleteUser = async (req, res) => {
//   try {
//     const { userId } = req.params;
//     await User.findByIdAndDelete(userId);
//     res.json({ message: 'User deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting user:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// }

module.exports = {
  login,
  register,
  logout, 
  verifyEmail,
  sendVerificationCode,
}
