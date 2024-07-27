const User = require('../models/User'); // Adjust the path as necessary

const adminAuth = async (req, res, next) => {
    try {
        const { userId } = req.user; // Assuming req.user is populated by an authentication middleware

        // Find the user by userId
        const admin = await User.findById(userId); // Mongoose method to find a user by ID

        // Check if the user exists and if they are an admin
        if (!admin || !admin.isAdmin) {
            return res.status(403).json({ message: "You are not authorized to do this action" });
        }

        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = adminAuth;
