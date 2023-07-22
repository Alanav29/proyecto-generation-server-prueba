const ShelteredPet = require("../models/shelteredPetModel");
const asyncHandler = require("express-async-handler");
const {
	cloudinaryUpload,
	cloudinaryDestroy,
} = require("../utils/cloudinaryMethods");
const fs = require("fs-extra");

const postShelteredPet = asyncHandler(async (req,res) => {
	const {name, description, date_found, state_location} = req.body

	//Obtiene public_id y secure_url de cloudinary
	const {public_id, secure_url} = await cloudinaryUpload(
		req.files.image.tempFilePath, 'shelteredPets'
	)

	const shelteredPet = await ShelteredPet.create({
		name,
		description,
		date_found,
		image: {public_id, secure_url},
		user_id: req.user.id,
		state_location
	})

	fs.unlink(req.files.image.tempFilePath)

	//Esto es feedback para los desarrolladores
	res.status(201).json({
		message: "Successfully posted sheltered pet",
		post_id: shelteredPet.id,
		pet_name: shelteredPet.name,
		user_name: req.user.name
	})
})

const putShelteredPet = asyncHandler(async (req,res) => {
	const shelteredPet = await ShelteredPet.findById(req.params.id)
	if(!shelteredPet) {
		res.status(400)
		throw new Error('Sheltered pet not found.')
	}

	const updatedShelteredPet = await ShelteredPet.findByIdAndUpdate(req.params.id, req.body, {new: true})
	res.status(200).json(updatedShelteredPet)
})

const delShelteredPet = asyncHandler(async (req,res) => {
	const shelteredPet = await ShelteredPet.findById(req.params.id)
	if(!shelteredPet) {
		res.status(400)
		throw new Error('Cannot delete. Post not found.')
	}

	await cloudinaryDestroy(shelteredPet.image.public_id)
	await shelteredPet.deleteOne()

	//Esto es feedback para los desarrolladores
	res.status(200).json({
		message: "The post has been succesfully deleted",
		post_id: shelteredPet.id,
		pet_name: shelteredPet.name,
		user_name: req.user.name
	})
})

const getShelteredPets = asyncHandler(async (req,res) => {
	const shelteredPets = await ShelteredPet.find()
	if(!shelteredPets) {
		res.status(400)
		throw new Error("There are no pets sheltered")
	}
	res.status(200).json(shelteredPets)
})

const getShelteredPet = asyncHandler(async (req,res)=>{
	const shelteredPet = await ShelteredPet.findById(req.params.id)
	if(!shelteredPet) {
		res.status(400)
		throw new Error("Sheltered pet not found")
	}
	res.status(200).json(shelteredPet)
})

module.exports = {
	postShelteredPet,
	getShelteredPets,
	putShelteredPet,
	delShelteredPet,
	getShelteredPet,
    getShelteredPets
};