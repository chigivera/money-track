const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    // Get the token from the request headers
    console.log(req.headers['authorization'])
    try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; 
  
    if (!token) {
      // If no token is provided, return a 401 Unauthorized error
      return res.status(401).json({ error: 'No token provided' });
    }
  
      // Verify the token
      const user = jwt.verify(token, process.env.MY_SECRET);
      
      // If the token is valid, attach the user object to the request
      req.user = user;
      next();
    } catch (error) {
      // If there's an error during token verification, handle it here
      console.log('Error verifying token:', error);
      return res.status(403).json({ error: 'Failed to authenticate token' });
    }
  };

module.exports = {authenticateToken}