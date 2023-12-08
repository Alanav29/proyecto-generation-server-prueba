const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Por favor teclea el titulo"],
    },
    width: {
      type: String,
      required: [true, "Por favor teclea el ancho"],
      unique: true,
    },
    height: {
      type: String,
      required: [true, "Por favor teclea el alto"],
    },
    price: {
      type: String,
      required: [true, "Por favor teclea el precio"],
    },
    technique: {
      type: String,
      required: [true, "Por favor teclea la tecnica"],
    },
    color: {
      type: String,
      required: [true, "Por favor teclea el color"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", userSchema);
