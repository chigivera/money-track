const jwt = require('jsonwebtoken')
const generateToken = (user, secretKey, expiresIn = '1h') => {
    const token = jwt.sign(user, secretKey, { expiresIn });
    return token;
}

const verifyToken = (token) => {
    return jwt.verify(token, process.env.MY_SECRET);
};


module.exports = {generateToken,verifyToken};
