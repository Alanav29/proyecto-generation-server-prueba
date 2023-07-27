const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
	postAdvertisement,
	getAdvertisements,
	delAdvertisement,
} = require("../controllers/advertisementsControllers");

router.route("/").post(protect, postAdvertisement).get(getAdvertisements);
router.route("/:id").delete(protect, delAdvertisement);

module.exports = router;
