const express = require("express");
const {
  createOrder,
  updateOrder,
  deleteOrder,
  getOrder,
  getOrders,
  getIncome,
} = require("../controllers/order");
const {
  verifyAdmin,
  verifyToken,
  verifyUser,
} = require("../utils/verifyToken");

const router = express.Router();

//CREATE
router.post("/", verifyToken, createOrder);

//UPDATE
router.put("/:id", verifyAdmin, updateOrder);

//DELETE
router.delete("/:id", verifyAdmin, deleteOrder);

//GET USER Orders
router.get("/find/:userId", verifyUser, getOrder);

//GET ALL Order
router.get("/", verifyAdmin, getOrders);

//GET MONTHLY INCOME
router.get("/income", verifyAdmin, getIncome);

module.exports = router;
