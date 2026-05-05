const express = require('express');
const { createCourse, getCourse, editCourse, getCourseById } = require('../controllers/courseController');
const isAuthentication = require('../middlewares/isAuthentication');
const upload = require('../middlewares/multer');
const router = express.Router();

router.post('/', isAuthentication , createCourse);
router.get('/', isAuthentication , getCourse);
router.put('/:id', isAuthentication, upload.single("thumbnail"), editCourse);
router.get('/:id', isAuthentication , getCourseById);
// router.delete('/:id', isAuthentication , getCourse);

module.exports = router;