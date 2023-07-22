const express = require("express")
const router = express.Router()
const {
	createComment,
	deleteComment,
	editComment,
    getPostComments,
} = require("../controllers/adoptionPetsControllers")
const { protect } = require("../middleware/authMiddleware")

router.post('/', protect, createComment)
router.put('/:id', protect, editComment)
router.delete("/:id", protect, deleteComment)
router.get("/:id", getPostComments)

module.exports = router
