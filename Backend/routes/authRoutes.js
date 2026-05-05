const express = require('express');
const router = express.Router();
const { register, login, getProfile, logout, updateProfile } = require('../controllers/authController');
const isAuthentication = require('../middlewares/isAuthentication');
const upload = require('../middlewares/multer');

router.post('/register', register);
router.post('/login', login);
router.get('/profile', isAuthentication, getProfile);
router.put('/profile/update', isAuthentication, upload.single("profilePicture"), updateProfile);

router.post('/logout', logout);

module.exports = router;