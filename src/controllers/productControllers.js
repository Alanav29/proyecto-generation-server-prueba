const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const {
  cloudinaryUpload,
  cloudinaryDestroy,
} = require("../utils/cloudinaryMethods");

const createProduct = asyncHandler(async (req, res) => {
  const { title, color, width, height, technique, price, img } = req.body;

  const productExists = await Product.findOne({ title });
  if (productExists) {
    res.status(400);
    throw new Error("Ese cuadro ya existe en la base de datos");
  }

  const { public_id, secure_url } = await cloudinaryUpload(img, "ferro");

  const product = await Product.create({
    title,
    height,
    price,
    technique,
    color,
    width,
    img: { public_id, secure_url },
  });

  //Esto es feedback para los desarrolladores
  res.status(201).json({
    message: "Se creo correctamente el producto",
    product: product,
  });
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

  let dataToUpdate = req.body;

  if (dataToUpdate.img) {
    const { public_id, secure_url } = await cloudinaryUpload(
      req.body.img,
      "ferro"
    );
    dataToUpdate.img = { public_id: public_id, secure_url: secure_url };
    const productUpdated = await Product.findByIdAndUpdate(
      req.params.id,
      dataToUpdate,
      {
        new: true,
      }
    );

    res.status(200).json(productUpdated);
  } else {
    const productUpdated = await Product.findByIdAndUpdate(
      req.params.id,
      dataToUpdate,
      {
        new: true,
      }
    );

    res.status(200).json(productUpdated);
  }
});

const delProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  await cloudinaryDestroy(product.img.public_id);

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
