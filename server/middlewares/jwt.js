const jwt = require('jsonwebtoken');
const  startSession = (req, res,next) => {
  console.log("starting session")
  try {
    const token = jwt.sign({ userId: req.user._id }, process.env.MY_SECRET, { expiresIn: '1h' });
    console.log("JWT Token generated:", token);
    res.setHeader('Authorization', `Bearer ${token}`);
    const user = req.user
    res.status(200).json({user,token});
 
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
const refreshToken = (req, res, next) => {
  const refreshToken = req.body.token;


  jwt.verify(refreshToken, process.env.MY_SECRET, (err, user) => {
      if (err) {
          console.error(err);
          return res.status(404).json({ error: "Token verification failed!" });
      }

      // Remove the old refresh token

      // Generate new tokens
      const newAccessToken = generateToken({ user }, process.env.MY_SECRET, '15m');
      const newRefreshToken = generateToken({ user }, process.env.MY_SECRET, '7d');

      // Attach tokens to the response object
      res.locals.tokens = {
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
      };

      // Call the next middleware or route handler
      next();
  });
};


module.exports = {startSession,refreshToken};
