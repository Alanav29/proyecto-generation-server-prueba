const express = require("express")
const router = express.Router()
const {
	postShelteredPet,
	putShelteredPet,
	delShelteredPet,
    getShelteredPets,
	getShelteredPet
} = require("../controllers/shelteredPetsControllers")
const { protect } = require("../middleware/authMiddleware")

router.post('/', protect, postShelteredPet)
router.put('/:id', protect, putShelteredPet)
router.delete("/:id", protect, delShelteredPet)
router.get("/", getShelteredPets)
router.get("/:id", getShelteredPet)

module.exports = router
