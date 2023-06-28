const Product = require("../models/Product");
const CustomError = require("../models/customError");

const createProduct = async (req, res, next) => {
  try {
    const { name, quantity, price } = req.body;
    const product = new Product({
      name,
      quantity,
      price,
    });

    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    next(error);
  }
};

const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

const getProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      throw new CustomError(" Product Not found", 404);
    }
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, quantity, price } = req.body;
    const product = await Product.findByIdAndUpdate(
      id,
      { name, quantity, price },
      { new: true }
    );

    if (!product) {
      throw new CustomError("Product Not found", 404);
    }
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      throw new CustomError("Product Not found", 404);
    }
    res.status(200).json({ message: "Product deleted successfully", product });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
