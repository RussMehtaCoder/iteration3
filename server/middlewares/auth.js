const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authenticateToken = async (token) => {
  if (!token) {
    throw new Error('Authentication required');
  }

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(decodedToken.userId);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  } catch (error) {
    throw new Error('Invalid token');
  }
};

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    req.user = await authenticateToken(token);
    next();
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};


// const authenticate = async (req, res, next) => {
//   const token = req.headers.authorization?.split(' ')[1];

//   if (!token) {
//     return res.status(401).json({ message: 'Authentication required' });
//   }

//   try {
//     const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
//     const user = await User.findById(decodedToken.userId);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     req.user = user;
//     next();
//   } catch (error) {
//     res.status(401).json({ message: 'Invalid token' });
//   }
// };

module.exports = { authenticate,authenticateToken};