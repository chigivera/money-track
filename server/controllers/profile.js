const Profile = require('../models/Profile');
const User = require('../models/User');
const { verifyToken } = require('../utils/jwt');
// Create a new profile
const createProfile = async (req, res) => {
  
    const { userId,firstname, lastname, city, country, zipcode, phone_number } = req.body;
    console.log({ userId,firstname, lastname, city, country, zipcode, phone_number })
    try {
        const profile = new Profile({
            userId:userId._id,
            firstname,
            lastname,
            city,
            country,
            zipcode,
            phone_number,
        });

        await profile.save();
        const user = await User.findByIdAndUpdate(userId, {
                   verified:true,
                }, { new: true });
            console.log(user)
        return res.status(201).json({ message: 'Profile created successfully', profile });
    } catch (error) {
        console.error('Error creating profile:', error);
        return res.status(500).json({ error: 'Failed to create profile' });
    }
};

// Get a profile by userId
const getProfile = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1]; // Extract the token from the Authorization header
    try {
        const decoded = verifyToken(token); // Decode the token using the secret key
        const userId = decoded.userId;
        console.log(userId)
        const profile = await Profile.findOne({ userId });
        console.log(profile)
        if (!profile) {
            return res.status(404).json({ error: 'Profile not found' });
        }
        
        return res.status(200).json({ profile });
    } catch (error) {
        console.error('Error fetching profile:', error);
        return res.status(500).json({ error: 'Failed to fetch profile' });
    }
};

// Update a profile
const updateProfile = async (req, res) => {
    const { userId } = req.params;
    const { firstname, lastname, city, country, zipcode, phone_number } = req.body;

    try {
        const profile = await Profile.findOneAndUpdate(
            { userId },
            { firstname, lastname, city, country, zipcode, phone_number },
            { new: true, runValidators: true }
        );

        if (!profile) {
            return res.status(404).json({ error: 'Profile not found' });
        }

        return res.status(200).json({ message: 'Profile updated successfully', profile });
    } catch (error) {
        console.error('Error updating profile:', error);
        return res.status(500).json({ error: 'Failed to update profile' });
    }
};

// Delete a profile
const deleteProfile = async (req, res) => {
    const { userId } = req.params;

    try {
        const profile = await Profile.findOneAndDelete({ userId });
        if (!profile) {
            return res.status(404).json({ error: 'Profile not found' });
        }
        return res.status(200).json({ message: 'Profile deleted successfully' });
    } catch (error) {
        console.error('Error deleting profile:', error);
        return res.status(500).json({ error: 'Failed to delete profile' });
    }
};

module.exports = {
    createProfile,
    getProfile,
    updateProfile,
    deleteProfile,
};
