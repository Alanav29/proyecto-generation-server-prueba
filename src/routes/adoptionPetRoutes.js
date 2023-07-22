const express = require("express")
const router = express.Router()
const {
	postAdoptionPet,
	putAdoptionPet,
	delAdoptionPet,
    getAdoptionPets,
	getAdoptionPet
} = require("../controllers/adoptionPetsControllers")
const { protect } = require("../middleware/authMiddleware")

router.post('/', protect, postAdoptionPet)
router.put('/:id', protect, putAdoptionPet)
router.delete("/:id", protect, delAdoptionPet)
router.get("/", getAdoptionPets)
router.get("/:id", getAdoptionPet)

module.exports = router
