const Cart = require("../models/Cart");

const createCart = async (req, res, next) => {
  const newCart = new Cart(req.body);
  try {
    savedCart = await newCart.save();
    res.status(200).json(savedCart);
  } catch (err) {
    next(err);
  }
};

const updateCart = async (req, res, next) => {
  try {
    const updateCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateCart);
  } catch (err) {
    next(err);
  }
};

const deleteCart = async (req, res, next) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Cart has been deleted");
  } catch (err) {
    next(err);
  }
};

const getCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.status(200).json(cart);
  } catch (err) {
    next(err);
  }
};

const getCarts = async (req, res, next) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createCart,
  updateCart,
  deleteCart,
  getCart,
  getCarts,
};
