const express = require("express");
const router = express.Router();
const {
  createProduct,
  productsData,
  updateProduct,
} = require("../controllers/productControllers");

router.post("/", createProduct);
router.get("/products", productsData);
router.put("/:id", updateProduct);

module.exports = router;
