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
      type: String,
      default:
        "https://res.cloudinary.com/dtyazhppg/image/upload/v1702105674/generation/cuadro1Gaby_qt2d8k.jpg",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
