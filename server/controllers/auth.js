const { verifyToken } = require("../utils/jwt");

const getAuth = (req, res) => {
  // Extract token from query parameters
  const token = req.body.accessToken; // Assuming you send the token as ?token=your_jwt

  if (!token) {
      return res.status(401).json(false);
  }
  try {
      const decoded = verifyToken(token);
      return res.status(200).json(true);
  } catch (error) {
      console.error('Error during authentication:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
};


  module.exports = {
    getAuth
  }

