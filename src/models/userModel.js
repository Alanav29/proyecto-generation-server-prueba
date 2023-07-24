const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Por favor teclea tu nombre"],
		},
		email: {
			type: String,
			required: [true, "Por favor teclea tu email"],
			unique: true,
		},
		password: {
			type: String,
			required: [true, "Por favor teclea tu password"],
		},
		isAdmin: {
			type: Boolean,
			default: false,
		},
		lost_pets: { type: Array, default: [] },
		sheltered_pets: { type: Array, default: [] },
		adoption_pets: { type: Array, default: [] },
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("User", userSchema);
