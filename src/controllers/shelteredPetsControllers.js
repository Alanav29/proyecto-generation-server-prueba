const ShelteredPet = require("../models/shelteredPetModel");
const asyncHandler = require("express-async-handler");
const {
	cloudinaryUpload,
	cloudinaryDestroy,
} = require("../utils/cloudinaryMethods");
const fs = require("fs-extra");

const postShelteredPet = asyncHandler(async (req, res) => {
	const { name, description, date_found, state_location } = req.body;

	if (!req.files?.image) {
		res.status(400);
		throw new Error("Falta imagen");
	}

	if (!name || !description || !date_found) {
		res.status(400);
		throw new Error("Faltan datos");
	}

	// se envia imagen a cludinary y se espera la respuesta
	const result = await cloudinaryUpload(
		req.files.image.tempFilePath,
		"shelteredPets"
	);

	// resul tendra un campo public_id que sera el id en cloudinary y otro secure_url
	// que sera el endpoint de la imagen, posteriormente creamos la mascota usando estos
	// valores en el campo image
	const shelteredPet = await ShelteredPet.create({
		name,
		description,
		date_found,
		image: { public_id: result.public_id, secure_url: result.secure_url },
		user_id: req.user.id,
		state_location,
	});

	// se elimina la imagen que quedo temporalmente guardada en uploads
	fs.unlink(req.files.image.tempFilePath);

	//Esto es feedback para los desarrolladores
	res.status(201).json({
		message: "Successfully posted sheltered pet",
		_id: shelteredPet.id,
		name: shelteredPet.name,
		user_id: req.user._id,
	});
});

const putShelteredPet = asyncHandler(async (req, res) => {
	const shelteredPet = await ShelteredPet.findById(req.params.id);
	if (!shelteredPet) {
		res.status(400);
		throw new Error("Sheltered pet not found.");
	}

	// se toman del body solo los campos que necesitamos
	const { name, description, date_found, pet_status, state_location } =
		req.body;

	// se crea objeto con info para actualizar la mascota que sera llenado con segun los
	// siguientes condicionales
	let infoToUpdate = {
		name: undefined,
		image: { public_id: undefined, secure_url: undefined },
		description: undefined,
		date_found: undefined,
		pet_status: undefined,
		state_location: undefined,
	};

	if (req.files?.image) {
		const result = await cloudinaryUpload(
			req.files.image.tempFilePath,
			"shelteredPets"
		);
		infoToUpdate.image.public_id = result.public_id;
		infoToUpdate.image.secure_url = result.secure_url;

		const deletedImage = cloudinaryDestroy(shelteredPet.image.public_id);
		fs.unlink(req.files.image.tempFilePath);
	} else {
		infoToUpdate.image.public_id = shelteredPet.image.public_id;
		infoToUpdate.image.secure_url = shelteredPet.image.secure_url;
	}

	if (name) {
		infoToUpdate.name = name;
	} else {
		infoToUpdate.name = shelteredPet.name;
	}

	if (description) {
		infoToUpdate.description = description;
	} else {
		infoToUpdate.description = shelteredPet.description;
	}

	if (date_found) {
		infoToUpdate.date_found = date_found;
	} else {
		infoToUpdate.date_found = shelteredPet.date_found;
	}

	if (pet_status) {
		infoToUpdate.pet_status = pet_status;
	} else {
		infoToUpdate.pet_status = shelteredPet.pet_status;
	}

	if (state_location) {
		infoToUpdate.state_location = state_location;
	} else {
		infoToUpdate.state_location = shelteredPet.state_location;
	}

	const updatedShelteredPet = await ShelteredPet.findByIdAndUpdate(
		req.params.id,
		infoToUpdate,
		{ new: true }
	);
	res.status(200).json(updatedShelteredPet);
});

const delShelteredPet = asyncHandler(async (req, res) => {
	const shelteredPet = await ShelteredPet.findById(req.params.id);
	if (!shelteredPet) {
		res.status(400);
		throw new Error("Cannot delete. Post not found.");
	}

	cloudinaryDestroy(shelteredPet.image.public_id);
	// se eliminan comentarios de la mascota
	await CommentModel.deleteMany({ post: req.params.id });
	await shelteredPet.deleteOne();

	//Esto es feedback para los desarrolladores
	res.status(200).json({
		message: "The post has been succesfully deleted",
		post_id: shelteredPet.id,
		pet_name: shelteredPet.name,
		user_name: req.user.name,
	});
});

const getShelteredPets = asyncHandler(async (req, res) => {
	const shelteredPets = await ShelteredPet.find();
	if (!shelteredPets) {
		res.status(400);
		throw new Error("There are no pets sheltered");
	}
	res.status(200).json(shelteredPets);
});

const getShelteredPet = asyncHandler(async (req, res) => {
	const shelteredPet = await ShelteredPet.findById(req.params.id);
	if (!shelteredPet) {
		res.status(400);
		throw new Error("Sheltered pet not found");
	}
	res.status(200).json(shelteredPet);
});

module.exports = {
	postShelteredPet,
	getShelteredPets,
	putShelteredPet,
	delShelteredPet,
	getShelteredPet,
	getShelteredPets,
};
