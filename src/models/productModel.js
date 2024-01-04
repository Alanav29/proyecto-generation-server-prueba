const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Por favor agrega el titulo"],
    },
    height: {
      type: Number,
      required: [true, "Por favor agrega el alto"],
    },
    price: {
      type: Number,
      required: [true, "Por favor agrega el precio"],
    },
    technique: {
      type: String,
      required: [true, "Por favor agrega la tecnica"],
    },
    color: {
      type: String,
      required: [true, "Por favor agrega el color"],
    },
    width: {
      type: Number,
      required: [true, "Por favor agrega el ancho"],
    },
    img: {
      public_id: String,
      secure_url: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
