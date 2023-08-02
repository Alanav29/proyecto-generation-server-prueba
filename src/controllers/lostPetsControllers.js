const LostPet = require("../models/lostPetModel");
const asynchandler = require("express-async-handler");
const {
	cloudinaryUpload,
	cloudinaryDestroy,
} = require("../utils/cloudinaryMethods");
const fs = require("fs-extra");
const User = require("../models/userModel");
const CommentModel = require("../models/commentModel");

const postLostPet = asynchandler(async (req, res) => {
	const { name, description, date_lost, user_id, image } = req.body;

	if (!image) {
		res.status(400);
		throw new Error("Falta imagen");
	}

	if (!name || !user_id || !description || !date_lost) {
		res.status(400);
		throw new Error("Faltan datos");
	}

	const result = await cloudinaryUpload(image, "lostPets");

	const lostPet = await LostPet.create({
		name,
		image: { public_id: result.public_id, secure_url: result.secure_url },
		user_id,
		description,
		date_lost,
	});

	res.status(201).json({
		_id: lostPet.id,
		name: lostPet.name,
		user_id: lostPet.user_id,
	});
});

const getLostPets = asynchandler(async (req, res) => {
	const lostPets = await LostPet.find();

	res.status(200).json(lostPets);
});

const delLostPet = asynchandler(async (req, res) => {
	const lostPet = await LostPet.findById(req.params.id);

	if (!lostPet) {
		res.status(400);
		throw new Error("La mascota no fué encontrada");
	}

	const deletedImage = cloudinaryDestroy(lostPet.image.public_id);

	await CommentModel.deleteMany({ post: req.params.id });

	lostPet.deleteOne();

	res.status(200).json({ lostPet });
});

const getLostPet = asynchandler(async (req, res) => {
	const lostPet = await LostPet.findById(req.params.id);
	if (!lostPet) {
		res.status(400);
		throw new Error("La mascota no fué encontrada");
	}
	res.status(200).json(lostPet);
});

const putLostPet = asynchandler(async (req, res) => {
	const lostPet = await LostPet.findById(req.params.id);
	const { name, description, date_lost, pet_status, image } = req.body;
	if (!lostPet) {
		res.status(400);
		throw new Error("La mascota no fué encontrada");
	}

	let infoToUpdate = {
		name: undefined,
		image: { public_id: undefined, secure_url: undefined },
		description: undefined,
		date_lost: undefined,
		pet_status: undefined,
	};

	if (image) {
		const result = await cloudinaryUpload(image, "lostPets");
		infoToUpdate.image.public_id = result.public_id;
		infoToUpdate.image.secure_url = result.secure_url;

		const deletedImage = cloudinaryDestroy(lostPet.image.public_id);
		// fs.unlink(req.files.image.tempFilePath);
	} else {
		infoToUpdate.image.public_id = lostPet.image.public_id;
		infoToUpdate.image.secure_url = lostPet.image.secure_url;
	}

	if (name) {
		infoToUpdate.name = name;
	} else {
		infoToUpdate.name = lostPet.name;
	}

	if (description) {
		infoToUpdate.description = description;
	} else {
		infoToUpdate.description = lostPet.description;
	}

	if (date_lost) {
		infoToUpdate.date_lost = date_lost;
	} else {
		infoToUpdate.date_lost = lostPet.date_lost;
	}

	if (pet_status) {
		infoToUpdate.pet_status = pet_status;
	} else {
		infoToUpdate.pet_status = lostPet.pet_status;
	}

	const petUpdated = await LostPet.findByIdAndUpdate(
		req.params.id,
		infoToUpdate,
		{
			new: true,
		}
	);

	res.status(200).json(petUpdated);
});

module.exports = {
	postLostPet,
	putLostPet,
	delLostPet,
	getLostPet,
	getLostPets,
};
