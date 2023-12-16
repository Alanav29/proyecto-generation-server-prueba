const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");

const createProduct = asyncHandler(async (req, res) => {
  const { title, width, height, color, price, technique, img } = req.body;

  if (!title) {
    res.status(400);
    throw new Error("El título es obligatorio", req.body);
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
    img,
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
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(400);
    throw new Error("Producto no encontrado");
  }

  const productUpdated = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(productUpdated);
});

const delProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(400);
    throw new Error("El producto no fué encontrado");
  }

  product.deleteOne();

  res.status(200).json({ product });
});

module.exports = {
  createProduct,
  productData,
  updateProduct,
  productsData,
  delProduct,
};
