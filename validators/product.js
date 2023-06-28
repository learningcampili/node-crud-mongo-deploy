const { check } = require("express-validator");
const { handleValidator } = require("../middlewares/handleValidator");
//Allways base on the Model

const validateProductCreate = [
  check("name", "The name is required").exists().notEmpty(),
  check("quantity")
    .exists()
    .withMessage("Quantity is required.")
    .isInt()
    .withMessage("Quantity must be an integer number.")
    .custom((value) => value >= 0)
    .withMessage("Quantity must be positive or 0."),
  check("price")
    .exists()
    .withMessage("Price is required.")
    .isNumeric()
    .withMessage("Price must be a number.")
    .custom((value) => value >= 0)
    .withMessage("Price must be positive or 0."),

  (req, res, next) => {
    handleValidator(req, res, next);
  },
];

const validateProductUpdate = [
  check("name", "The name is required").optional().notEmpty(),
  check("quantity")
    .optional()
    .isInt()
    .withMessage("Quantity must be an integer number.")
    .custom((value) => value >= 0)
    .withMessage("Quantity must be positive or 0."),
  check("price")
    .optional()
    .isNumeric()
    .withMessage("Price must be a number.")
    .custom((value) => value >= 0)
    .withMessage("Price must be positive or 0."),
  (req, res, next) => {
    handleValidator(req, res, next);
  },
];

const validateId = [
  check("id").exists().isMongoId().withMessage("Enter a vaild Id"),
  (req, res, next) => {
    handleValidator(req, res, next);
  },
];

module.exports = { validateId, validateProductCreate, validateProductUpdate };
