const Order = require("../models/order.model");
const User = require("../models/user.models");

const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.findAllForUser(res.locals.uid);

    res.render("customer/orders/all-orders", { orders: orders });
  } catch (error) {
    next(error);
    return;
  }
};

const addOrder = async (req, res, next) => {
  const cart = res.locals.cart;

  let userData;
  try {
    userData = await User.findById(res.locals.uid);
  } catch (error) {
    return next(error);
  }

  const order = new Order(cart, userData);

  try {
    await order.save();
  } catch (error) {
    return next(error);
  }

  req.session.cart = null;

  res.redirect("/orders");
};

module.exports = {
  addOrder,
  getOrders,
};