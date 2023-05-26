const Product = require("../models/product.model");
const Order = require("../models/order.model");

const getProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.render("admin/products/all-products", { products: products });
  } catch (error) {
    next(error);
    return;
  }
};

const getNewProduct = (req, res) => {
  res.render("admin/products/new-product");
};

const createNewProduct = async (req, res, next) => {
  const product = new Product({
    ...req.body,
    image: req.file.filename,
  });

  try {
    await product.save();
  } catch (error) {
    next(error);
    return;
  }

  res.redirect("/admin/products");
};

const getUpdateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    res.render("admin/products/update-product", { product: product });
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  const product = new Product({
    ...req.body,
    _id: req.params.id,
  });

  if (req.file) {
    product.replaceImage(req.file.filename);
  }

  try {
    await product.save();
  } catch (error) {
    next(error);
    return;
  }

  res.redirect("/admin/products");
};

const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    await product.remove();
  } catch (error) {
    next(error);
    return;
  }

  res.json({ message: "Product get deleted" });
};

const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.findAll();
    res.render("admin/orders/admin-orders", { orders: orders });
  } catch (error) {
    next(error);
  }
};

const updateOrder = async (req, res, next) => {
  const orderId = req.params.id;
  const newStatus = req.body.status;

  try {
    const order = await Order.findById(orderId);

    order.status = newStatus;

    await order.save();

    res.json({ message: "Order updated", newStatus: newStatus });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProducts,
  getNewProduct,
  createNewProduct,
  getUpdateProduct,
  updateProduct,
  deleteProduct,
  getOrders,
  updateOrder,
};
