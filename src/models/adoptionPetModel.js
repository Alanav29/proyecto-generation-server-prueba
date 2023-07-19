const mongoose = require("mongoose");

const adoptionPetSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Por favor agrega el nombre de la mascota"],
		},
		image: {
			public_id: String,
			secure_url: String,
		},
		user_id: {
			type: mongoose.Schema.Types.ObjectId,
			required: [true, "user id missing"],
			ref: 'User',
		},
		description: {
			type: String,
			required: [true, "Por favor agrega la descripcion de la mascota"],
		},
		pet_status: {
			type: Boolean,
			default: false,
		}
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("AdoptionPet", adoptionPetSchema);
