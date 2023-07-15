const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv").config();

cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.API_KEY,
	api_secret: process.env.API_SECRET,
	secure: true,
});

const cloudinaryUpload = async (filePath, folder) => {
	return await cloudinary.uploader.upload(filePath, { folder: folder });
};

module.exports = { cloudinaryUpload };
