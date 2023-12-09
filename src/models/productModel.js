const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Por favor teclea el titulo"],
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
    width: {
      type: String,
      required: [true, "Por favor teclea el color"],
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
