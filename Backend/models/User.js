const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  profilePicture: {
    type: String,
    default: 'https://www.pngall.com/wp-content/uploads/5/Profile-PNG-High-Quality-Image.png'
  },

  enrolledCourses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course'
    }
  ],

  role: {
    type: String,
    enum: ['student', 'instructor'],
    default: 'student'
  }

}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);