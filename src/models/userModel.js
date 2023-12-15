const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Por favor agrega tu nombre"],
    },
    email: {
      type: String,
      required: [true, "Por favor agrega tu email"],
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: [true, "Por favor agrega tu numero de telefono"],
    },
    password: {
      type: String,
      required: [true, "Por favor agrega tu password"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
