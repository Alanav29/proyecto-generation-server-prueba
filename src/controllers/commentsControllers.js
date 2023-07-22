const CommentModel = require('../models/commentModel')
const asyncHandler = require('express-async-handler')

const createComment = asyncHandler( async (req,res) => {

    /**postType debe ser un string 'LostPet','ShelteredPet','AdoptionPet' */
    const {text, postId, postType} = req.body

    if (!text) {
        res.status(400)
		throw new Error("Some text is required to post a comment")
    }

    const comment = await CommentModel.create({
        user_id: req.user.id,
        text: text,
        post: postId,
        postType: postType
    })

    console.log(`${req.user.name} made a new comment on the following ${postType} post: ${postId}`)
    res.status(200).json({comment})

} )

const editComment = asyncHandler ( async (req, res) => {
    const comment = await CommentModel.findById(req.params.id)
    if(!comment){
        res.status(400)
        throw new Error('Comment not found')
    }

    const commentUpdated = await CommentModel.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).json(commentUpdated)
})

const deleteComment = asyncHandler( async(req,res)=> {
    const comment = await CommentModel.findById(req.params.id)
    if (!comment){
        res.status(400)
        throw new Error('Comment not found')
    }
    await comment.deleteOne()
    res.status(200).json({id: req.params.id})
})

const getComments = asyncHandler( async(req,res)=>{
    const comments = await CommentModel.find().populate('post')
    res.status(200).json(comments)

})

module.exports = {
   createComment,
   editComment,
   deleteComment,
   getComments
}