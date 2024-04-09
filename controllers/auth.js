const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/Users');
const Payment = require('../models/Payments');

// Register a new user
const register = async (req, res, next) => {
  const { firstName, lastName, email, password: password, role } = req.body;
  console.log(req.body);

  try {
    // const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ firstName, lastName, email, password: password, role});
    await user.save();

    const paymentUser = new Payment({ firstName, lastName});
    await paymentUser.save();
    

    res.json({ message: 'Registration successful' });
  } catch (error) {
    next(error);
  }
};

// Login with an existing user
const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    console.log(`The password is ${password}`);
    const passwordMatch = await user.comparePassword(password);

    console.log
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: '1 hour'
    });
    res.json({ token });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login };
