const AdoptionPet = require("../models/adoptionPetModel");
const asyncHandler = require("express-async-handler");
const {
	cloudinaryUpload,
	cloudinaryDestroy,
} = require("../utils/cloudinaryMethods");
const fs = require("fs-extra");

const postAdoptionPet = asyncHandler(async (req,res) => {
    const { name, description } = req.body

 //Obtiene public_id y secure_url de cloudinary
    const {public_id, secure_url} = await cloudinaryUpload(
        req.files.image.tempFilePath, 'adoptionPets'
    )
    
    const adoptionPet = await AdoptionPet.create({
        name,
        description,
        image: {public_id, secure_url},
        user_id: req.user.id
    })

    fs.unlink(req.files.image.tempFilePath)

    //Esto es feedback para los desarrolladores
    res.status(201).json({
        message: "Succesfully posted pet for adoption",
        post_id: adoptionPet.id,
        pet_name: adoptionPet.name,
        user_name: req.user.name,
 })

}
)

const putAdoptionPet = asyncHandler(async (req,res) => {
    const adoptionPet = await AdoptionPet.findById(req.params.id)

    if(!adoptionPet) {
        res.status(400)
        throw new Error('Pet for adoption not found.')
    }

    const updatedAdoptionPet = await AdoptionPet.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.status(200).json(updatedAdoptionPet)

    }
    )

const delAdoptionPet = asyncHandler(async (req,res) => {
    console.log(req.params.id)
    const adoptionPet = await AdoptionPet.findById(req.params.id)
    console.log(adoptionPet)
    if (!adoptionPet) {
        res.status(400)
        throw new Error('Cannot delete. Post not found.')
    }
    

    await cloudinaryDestroy(adoptionPet.image.public_id)
    await adoptionPet.deleteOne()

    //Esto es feedback para los desarrolladores
    res.status(200).json({
        message: "The post has been succesfully deleted",
        post_id: adoptionPet.id,
        pet_name: adoptionPet.name,
        user_name: req.user.name
    })
})

const getAdoptionPets = asyncHandler(async (req,res) => {
    const adoptionPets = await AdoptionPet.find()
    if(!adoptionPets){
        res.status(400)
        throw new Error("There are no pets for adoption.")
    }
    res.status(200).json(adoptionPets)
})

const getAdoptionPet = asyncHandler(async (req,res) => {
    const adoptionPet = await AdoptionPet.findById(req.params.id)
    if (!adoptionPet) {
        res.status(400)
        throw new Error("Pet for adoption not found")
    }
    res.status(200).json(adoptionPet)
})

module.exports = {
	postAdoptionPet,
	getAdoptionPets,
	putAdoptionPet,
	delAdoptionPet,
	getAdoptionPet,
    getAdoptionPets
};
