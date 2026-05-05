const { v2: cloudinary } = require('cloudinary');

// Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload media
const uploadMedia = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file, {
      resource_type: 'auto',
    });
    return result;
  } catch (error) {
    console.error('Error uploading media:', error);
    throw error;
  }
};

// Delete image/file
const deleteMediaFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error('Error deleting media:', error);
    throw error;
  }
};

// Delete video
const deleteVideoFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: 'video',
    });
    return result;
  } catch (error) {
    console.error('Error deleting video:', error);
    throw error;
  }
};

module.exports = {
  uploadMedia,
  deleteMediaFromCloudinary,
  deleteVideoFromCloudinary,
};