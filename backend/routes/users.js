const express = require("express");
const { verifyUser, verifyAdmin } = require("../utils/verifyToken");
const { updateUser, deleteUser, getUser, getUsers, getStats } = require("../controllers/user");

const router = express.Router();

// router.put(":/id", (req, res) => {});

//UPDATE
router.put("/:id", verifyUser, updateUser);

//DELETE
router.delete("/:id", verifyUser, deleteUser);

//GET
router.get("/find/:id", verifyAdmin, getUser);

//GET ALL
router.get("/", verifyAdmin, getUsers);

//GET USER STATS
router.get("/stats", verifyAdmin, getStats);

module.exports = router;
