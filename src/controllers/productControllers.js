const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");

const createProduct = asyncHandler(async (req, res) => {
  const { title, width, height, color, price, technique } = req.body;

  if (title === undefined) {
    res.status(400);
    throw new Error(title);
  }

  const productExists = await Product.findOne({ title });
  if (productExists) {
    res.status(400);
    throw new Error("Ese producto ya existe");
  }

  const product = await Product.create({
    title,
    width,
    height,
    color,
    price,
    technique,
  });

  if (product) {
    res.status(201).json(product);
  } else {
    res.status(400);
    throw new Error("Datos No Validos");
  }
});

const productsData = asyncHandler(async (req, res) => {
  const products = await Product.find();

  res.status(200).json(products);
});

const productData = asyncHandler(async (req, res) => {
  const product = await Product.findOne({ _id: req.params.id });
  if (!product) {
    res.status(400);
    throw new Error("Producto no encontrado");
  }

  res.status(200).json(product);
});

const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findbyId(req.params.id);
  if (!product) {
    res.status(400);
    throw new Error("Producto no encontrado");
  }

  const productUpdated = await Product.findbyIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json({ productUpdated });
});

module.exports = {
  createProduct,
  productData,
  updateProduct,
  productsData,
};
