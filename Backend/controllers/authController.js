const User = require('../models/User');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');

// Register
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'All fields required' });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'user already register' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const registerUser = await User.create({ name, email, password: hashedPassword });
    return res.status(200).json({ success: true, message: 'Register successfully', registerUser });
  } catch (error) {
    return res.status(400).json({ success: false, 
      message: 'Register failed', error: error.message });
  }
};

// Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'All fields required' });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: 'invalid crediential' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'invalid crediential' });
    }


    generateToken(res, user, `welcome ${user.name}`); 

  } catch (error) {
    return res.status(400).json({ success: false, message: 'Register failed', error: error.message });
  }


};


module.exports = { register, login }; 9