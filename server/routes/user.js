const express = require('express');
const router = express.Router();
const {
    login,
    register,
    logout,
    // createUser,
    // updateUser,
    // getUser,
    // getUserById,
    // deleteUser,
    verifyEmail,
    sendVerificationCode

} = require('../controllers/user');
const comparePassword = require('../middlewares/comparePasswords');
const { startSession } = require('../middlewares/jwt');
const { hashPassword } = require('../middlewares/hashPassword');
const { authenticateToken } = require('../errors/unauthenticated');
const { createProfile, getProfile } = require('../controllers/profile');


router.post('/send-code', sendVerificationCode);

router.post('/verify-code', verifyEmail);

router.post('/profile' ,createProfile);
router.get('/profile' ,authenticateToken,getProfile);



router.post('/login',comparePassword,startSession );
router.post('/register', hashPassword, register);
router.get('/logout', authenticateToken,logout);


// // Create a new user (admin only)
// router.post('/', createUser);

// // Update a user
// router.put('/:userId', updateUser);

// // Get all users (admin only)
// router.get('/', getUser);

// // Get a user by ID
// router.get('/:userId', getUserById);

// // Delete a user (admin only)
// router.delete('/:userId', deleteUser);

module.exports = router;
