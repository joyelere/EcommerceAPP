const express = require("express");
const {
  createCart,
  updateCart,
  deleteCart,
  getCart,
  getCarts,
} = require("../controllers/cart");
const {
  verifyAdmin,
  verifyToken,
  verifyUser,
} = require("../utils/verifyToken");

const router = express.Router();

//CREATE
router.post("/", verifyToken, createCart);

//UPDATE
router.put("/:id", verifyUser, updateCart);

//DELETE
router.delete("/:id", verifyUser, deleteCart);

//GET USER CART
router.get("/find/:userId", verifyUser, getCart);

//GET ALL CART
router.get("/", verifyAdmin, getCarts);

module.exports = router;
