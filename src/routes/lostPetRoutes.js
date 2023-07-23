const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
	postLostPet,
	getLostPets,
	putLostPet,
	delLostPet,
	getLostPet,
} = require("../controllers/lostPetsControllers");

router.route("/").post(protect, postLostPet).get(getLostPets);

router
	.route("/:id")
	.put(protect, putLostPet)
	.delete(protect, delLostPet)
	.get(getLostPet);

module.exports = router;
