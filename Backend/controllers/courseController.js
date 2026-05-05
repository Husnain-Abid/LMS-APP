const { deleteMediaFromCloudinary, uploadMedia } = require("../middlewares/cloundinary");
const Course = require("../models/Course");

// create course
const createCourse = async (req, res) => {
  try {
    const { title, category } = req.body;
    if (!title || !category) {
      return res.status(400).json({ success: false, message: 'All fields required' });
    }
    // Add course creation logic here
    const newCourse = await Course.create({ title, category, creator: req.id });
    return res.status(200).json({ success: true, message: 'Course created successfully', course: newCourse });

  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Failed to create course', error: error.message
    });
  }
};

// get course
const getCourse = async (req, res) => {
  try {

    const courses = await Course.find({ creator: req.id });

    if (!courses) {
      return res.status(404).json({ success: false, message: 'Courses not found', courses: [] });
    }

    return res.status(200).json({ success: true, courses });

  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Failed to fetch courses', error: error.message
    });
  }
};

// edit course
const editCourse = async (req, res) => {
  try {
    console.log(req.file);
    console.log(req.body);

    const { id } = req.params;
    const { title, subTitle, description, category, courseLevel, price } = req.body;
    const thumbnail = req.file;

    if (!title || !subTitle || !description || !category || !courseLevel || !price) {
      return res.status(400).json({ success: false, message: 'All fields required' });
    }

    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    let courseThumbnail = course.thumbnail;

    if (thumbnail) {
      if (course.thumbnail) {
        const publicId = course.thumbnail.split('/').pop().split('.')[0];
        await deleteMediaFromCloudinary(publicId);
      }

      const result = await uploadMedia(thumbnail.path);
      courseThumbnail = result.secure_url;
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      {
        title,
        subTitle,
        description,
        category,
        courseLevel,
        price,
        thumbnail: courseThumbnail,
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: 'Course updated successfully',
      course: updatedCourse,
    });

  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Failed to update course',
      error: error.message
    });
  }
};

//get course by id
const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id);

    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    return res.status(200).json({ success: true, course });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Failed to fetch course',
      error: error.message
    });
  }
};

module.exports = { createCourse, getCourse, editCourse, getCourseById };