const LostPet = require("../models/lostPetModel");
const asynchandler = require("express-async-handler");
const { cloudinaryUpload } = require("../utils/cloudinaryUpload");
const fs = require("fs-extra");

const postLostPet = asynchandler(async (req, res) => {
	const { name, owner, description, date_lost } = req.body;

	if (!req.files?.image) {
		res.status(400);
		throw new Error("Falta imagen");
	}

	if (!name || !owner || !description || !date_lost) {
		res.status(400);
		throw new Error("Faltan datos");
	}

	const result = await cloudinaryUpload(
		req.files.image.tempFilePath,
		"lostPets"
	);

	const lostPet = await LostPet.create({
		name,
		image: { public_id: result.public_id, secure_url: result.secure_url },
		owner,
		description,
		date_lost,
	});

	await fs.unlink(req.files.image.tempFilePath);

	if (lostPet) {
		res.status(201).json({
			_id: lostPet.id,
			name: lostPet.name,
			owner: lostPet.owner,
		});
	}
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

	await lostPet.deleteOne();

	res.status(200).json(lostPet);
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
	const { name, description, date_lost, pet_status } = req.body;
	if (!lostPet) {
		res.status(400);
		throw new Error("La mascota no fué encontrada");
	}

	let infoToUpdate = {
		name: undefined,
		description: undefined,
		date_lost: undefined,
		pet_status: undefined,
	};

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
	getLostPets,
	putLostPet,
	delLostPet,
	getLostPet,
};
