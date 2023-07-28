const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
	postAdvertisement,
	getAdvertisements,
	delAdvertisement,
	getAdvertisement,
} = require("../controllers/advertisementsControllers");

router.route("/").post(protect, postAdvertisement).get(getAdvertisements);
router.route("/:id").delete(protect, delAdvertisement).get(getAdvertisement);

module.exports = router;
