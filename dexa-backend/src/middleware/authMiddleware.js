const { verifyToken } = require('../config/jwt-config');

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; 

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  const decoded = verifyToken(token); 

  if (!decoded) {
    return res.status(401).json({ message: 'Invalid or expired token.' });
  }

  req.user = {
    userId: decoded.userId,
    email: decoded.email,
    role:decoded.role
  };

  next(); 
};

module.exports = { authenticateToken };
