const Product = require("../models/product.model");

const getAllproducts = async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.render("customer/products/all-products", { products: products });
  } catch (error) {
    next(error);
  }
};

const getProductDetails = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    res.render("customer/products/product-detail", { product: product });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllproducts,
  getProductDetails,
};
