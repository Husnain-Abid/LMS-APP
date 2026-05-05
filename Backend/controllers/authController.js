const User = require('../models/User');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');
const { deleteMediaFromCloudinary, uploadMedia } = require('../middlewares/cloundinary');

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
    return res.status(400).json({
      success: false,
      message: 'Register failed', error: error.message
    });
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
    return res.status(400).json({ success: false, message: 'Login failed', error: error.message });
  }


};

// get profile
const getProfile = async (req, res) => {
  try {

    console.log("user id from token", req.id);
    const userId = req.id;

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    return res.status(200).json({ success: true, user });

  } catch (error) {
    return res.status(400).json({ success: false, message: 'Failed to fetch profile', error: error.message });
  }


};

// update profile
const updateProfile = async (req, res) => {
  try {
    const userId = req.id;
    const { name } = req.body;
    const profilePicture = req.file;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // extract the public ID from the existing profile picture URL and delete it from Cloudinary
    if (user.profilePicture) {
      const publicId = user.profilePicture.split('/').slice(-1)[0].split('.')[0];
      await deleteMediaFromCloudinary(publicId);
    }

    // upload the new profile picture to Cloudinary and get the URL
    const cloudinaryResult = await uploadMedia(profilePicture.path);
    const profilePictureUrl = cloudinaryResult.secure_url;

    const updatedData = { name, profilePicture: profilePictureUrl };

    // update the user's profile with the new name and profile picture URL
    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true }).select("-password");

    return res.status(200).json({ success: true, message: 'Profile updated successfully', updatedUser });

  } catch (error) {
    return res.status(400).json({ success: false, message: 'Failed to update profile', error: error.message });
  }
};

// logout
const logout = (req, res) => {
  return res.status(200).clearCookie("token").json({ success: true, message: 'Logged out successfully' });
};

module.exports = { register, login, getProfile, updateProfile, logout };