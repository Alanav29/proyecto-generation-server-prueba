const express = require("express");
const router = express.Router();
const {
  createUser,
  loginUser,
  updateUser,
} = require("../controllers/usersControllers");
const { protect } = require("../middleware/authMiddleware");

router.post("/", createUser);
router.post("/login", loginUser);
router.put("/:id", protect, updateUser);

module.exports = router;
