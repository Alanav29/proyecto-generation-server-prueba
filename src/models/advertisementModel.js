const mongoose = require("mongoose");

const advertisementSchema = mongoose.Schema(
	{
		title: {
			type: String,
			default: "",
		},
		image: {
			public_id: String,
			secure_url: String,
		},
		user_id: {
			type: mongoose.Schema.Types.ObjectId,
			required: [true, "user id missing"],
			ref: "User",
		},
		description: {
			type: String,
			required: [true, "Por favor agrega la descripcion del anuncio"],
		},
		status: {
			type: Boolean,
			default: true,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Advertisement", advertisementSchema);
