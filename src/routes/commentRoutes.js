const express = require("express")
const router = express.Router()
const {
	createComment,
	deleteComment,
	editComment,
    getComments,
} = require("../controllers/commentsControllers")
const { protect } = require("../middleware/authMiddleware")

router.post('/', protect, createComment)
router.put('/:id', protect, editComment)
router.delete("/:id", protect, deleteComment)
router.get("/", getComments)

module.exports = router
