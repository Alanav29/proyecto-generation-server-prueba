const AdoptionPet = require("../models/adoptionPetModel");
const asyncHandler = require("express-async-handler");
const {
	cloudinaryUpload,
	cloudinaryDestroy,
} = require("../utils/cloudinaryMethods");
const fs = require("fs-extra");
const CommentModel = require("../models/commentModel");

const postAdoptionPet = asyncHandler(async (req, res) => {
	const { name, description, image } = req.body;

	//Obtiene public_id y secure_url de cloudinary
	const { public_id, secure_url } = await cloudinaryUpload(
		image,
		"adoptionPets"
	);

	const adoptionPet = await AdoptionPet.create({
		name,
		description,
		image: { public_id, secure_url },
		user_id: req.user.id,
	});

	//Esto es feedback para los desarrolladores
	res.status(201).json({
		message: "Succesfully posted pet for adoption",
		_id: adoptionPet.id,
		pet_name: adoptionPet.name,
		user_name: req.user.name,
	});
});

const delAdoptionPet = asyncHandler(async (req, res) => {
	const adoptionPet = await AdoptionPet.findById(req.params.id);

	if (!adoptionPet) {
		res.status(400);
		throw new Error("La mascota no fué encontrada");
	}

	const deletedImage = cloudinaryDestroy(adoptionPet.image.public_id);

	await CommentModel.deleteMany({ post: req.params.id });

	adoptionPet.deleteOne();

	res.status(200).json({ adoptionPet });
});

const putAdoptionPet = asyncHandler(async (req, res) => {
	const adoptionPet = await AdoptionPet.findById(req.params.id);
	const { name, description, pet_status, image } = req.body;
	if (!adoptionPet) {
		res.status(400);
		throw new Error("La mascota no fué encontrada");
	}

	let infoToUpdate = {
		name: undefined,
		image: { public_id: undefined, secure_url: undefined },
		description: undefined,
		pet_status: undefined,
	};

	if (image) {
		const result = await cloudinaryUpload(image, "lostPets");
		infoToUpdate.image.public_id = result.public_id;
		infoToUpdate.image.secure_url = result.secure_url;

		const deletedImage = cloudinaryDestroy(adoptionPet.image.public_id);
	} else {
		infoToUpdate.image.public_id = adoptionPet.image.public_id;
		infoToUpdate.image.secure_url = adoptionPet.image.secure_url;
	}

	if (name) {
		infoToUpdate.name = name;
	} else {
		infoToUpdate.name = adoptionPet.name;
	}

	if (description) {
		infoToUpdate.description = description;
	} else {
		infoToUpdate.description = adoptionPet.description;
	}

	if (pet_status) {
		infoToUpdate.pet_status = pet_status;
	} else {
		infoToUpdate.pet_status = adoptionPet.pet_status;
	}

	const petUpdated = await AdoptionPet.findByIdAndUpdate(req.infoToUpdate, {
		new: true,
	});

	res.status(200).json(petUpdated);
});

const getAdoptionPets = asyncHandler(async (req, res) => {
	const adoptionPets = await AdoptionPet.find();
	if (!adoptionPets) {
		res.status(400);
		throw new Error("There are no pets for adoption.");
	}
	res.status(200).json(adoptionPets);
});

const getAdoptionPet = asyncHandler(async (req, res) => {
	const adoptionPet = await AdoptionPet.findById(req.params.id);
	if (!adoptionPet) {
		res.status(400);
		throw new Error("Pet for adoption not found");
	}
	res.status(200).json(adoptionPet);
});

module.exports = {
	postAdoptionPet,
	getAdoptionPets,
	putAdoptionPet,
	delAdoptionPet,
	getAdoptionPet,
};
