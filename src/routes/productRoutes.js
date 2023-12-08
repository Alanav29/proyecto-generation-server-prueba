const express = require("express");
const router = express.Router();
const {
  createProduct,
  productData,
  updateProduct,
  productsData,
  delProduct,
} = require("../controllers/productControllers");

router.post("/", createProduct);
router.get("/", productsData);
router.get("/:id", productData);
router.put("/:id", updateProduct);
router.delete("/:id", delProduct);

module.exports = router;
