const mongoose = require("mongoose");

const lostPetSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Por favor agrega el nombre de la mascota"],
		},
		image: {
			public_id: String,
			secure_url: String,
		},
		owner: {
			type: String,
			required: [true, "Por favor agrega al dueño de la mascota"],
		},
		description: {
			type: String,
			required: [true, "Por favor agrega la descripcion de la mascota"],
		},
		date_lost: {
			type: Date,
			required: [true, "Por favor agrega la fecha en que se perdio"],
		},
		pet_status: {
			type: Boolean,
			default: false,
		},
		comments: {
			type: Array,
			default: [],
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("LostPet", lostPetSchema);
