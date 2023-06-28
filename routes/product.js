const { Router } = require("express");

const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product");

const {
  validateId,
  validateProductCreate,
  validateProductUpdate,
} = require("../validators/product");

const router = Router();

router.post("/", validateProductCreate, createProduct);
router.get("/", getProducts);
router.get("/:id", validateId, getProduct);
router.put("/:id", validateId, validateProductUpdate, updateProduct);
router.delete("/:id", validateId, deleteProduct);

module.exports = router;
