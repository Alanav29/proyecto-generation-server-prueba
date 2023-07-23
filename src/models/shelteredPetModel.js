const mongoose = require("mongoose");

const shelteredPetSchema = mongoose.Schema(
	{
		name: {
			type: String,
			default: '',
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
		date_found: {
			type: Date,
			required: [true, "Por favor agrega la fecha en que se resguardó"],
		},
		pet_status: {
			type: Boolean,
			default: false,
		},
		state_location: {
			type: String,
			required: [true, "Se necesita ingresar un estado de la republica"]
		}
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("ShelteredPet", shelteredPetSchema);