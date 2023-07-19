const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
	{
        user:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        text:{
            type: String,
            required: true,
        },
        post:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            refPath: 'postType'
        },
        postType:{
            type: String,
            required: true,
            enum: ['LostPet','ShelteredPet','AdoptionPet']
        }
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Comment", commentSchema);
