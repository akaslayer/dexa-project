const { signToken } = require('../config/jwt-config.js');; 
const userController = require("../controller/users");
const {sendResponse,failResponseServer, sendResponsePagination} = require('../utils/response.js');
const bcrypt = require('bcrypt');

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  const user = await userController.getUserByEmail(email);

  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password.' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Invalid email or password.' });
  }

  const token = signToken(user);

  res.setHeader('Authorization', `Bearer ${token}`);
  
  return res.status(200).json({
    statusCode:200,
    message: 'Login successful',
    success: true,
    token:token,
    role:user.role
  });
};

module.exports = { login };