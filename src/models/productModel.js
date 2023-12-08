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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
