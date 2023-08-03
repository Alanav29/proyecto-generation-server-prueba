const Advertisement = require("../models/advertisementModel");
const asynchandler = require("express-async-handler");
const {
	cloudinaryUpload,
	cloudinaryDestroy,
} = require("../utils/cloudinaryMethods");

const postAdvertisement = asynchandler(async (req, res) => {
	const { title, description, image } = req.body;

	if (req.user.isAdmin == false) {
		res.status(400);
		throw new Error("Solo puede publicar un administrador");
	}

	if (!image) {
		res.status(400);
		throw new Error("Falta imagen");
	}

	if (!title || !req.user._id || !description) {
		res.status(400);
		throw new Error("Faltan datos");
	}

	const result = await cloudinaryUpload(image, "advertisements");

	const advertisement = await Advertisement.create({
		title,
		image: { public_id: result.public_id, secure_url: result.secure_url },
		user_id: req.user._id,
		description,
	});

	// fs.unlink(req.files.image.tempFilePath);

	res.status(201).json({
		_id: advertisement.id,
		title: advertisement.title,
		user_id: advertisement.user_id,
	});
});

const getAdvertisements = asynchandler(async (req, res) => {
	const advertisements = await Advertisement.find().sort({ _id: 1 }).limit(3);

	res.status(200).json(advertisements);
});

const getAdvertisement = asynchandler(async (req, res) => {
	const advertisement = await Advertisement.findById(req.params.id);
	if (!advertisement) {
		res.status(400);
		throw new Error("El anuncio no fué encontrado");
	}
	res.status(200).json(advertisement);
});

const delAdvertisement = asynchandler(async (req, res) => {
	const advertisement = await Advertisement.findById(req.params.id);

	if (!Advertisement) {
		res.status(400);
		throw new Error("El anuncio no fué encontrado");
	}

	const deletedImage = cloudinaryDestroy(advertisement.image.public_id);

	advertisement.deleteOne();

	res.status(200).json({ advertisement });
});

module.exports = {
	postAdvertisement,
	getAdvertisements,
	delAdvertisement,
	getAdvertisement,
};
