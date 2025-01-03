const jwt = require('jsonwebtoken');


const secretKey = process.env.JWT_SECRET_KEY;

const signToken = (user) => {
  return jwt.sign({ userId: user.id, email: user.email,role:user.role}, secretKey, {
    expiresIn: '1h', 
  });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, secretKey);
  } catch (err) {
    return null; 
  }
};

module.exports = { signToken, verifyToken };
