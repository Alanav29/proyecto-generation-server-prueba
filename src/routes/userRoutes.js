const express = require("express");
const router = express.Router();
const {
	createUser,
	loginUser,
	userInfo,
	updateUser,
} = require("../controllers/usersControllers");
const { protect } = require("../middleware/authMiddleware");

router.post("/", createUser);
router.post("/login", loginUser);
router.get("/userInfo", protect, userInfo);
router.put("/:id", protect, updateUser);

module.exports = router;
