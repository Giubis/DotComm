const express = require("express");
const { authToken, authAdmin } = require("../middlewares/authentication");
const {
  getUsers,
  getUserByID,
  createAdmin,
  createUser,
  loginUser,
  patchUserByID,
  deleteUserByID,
} = require("../controllers/users.controller");

const router = express.Router();

router.get("/", authToken, authAdmin, getUsers);
router.get("/:id", authToken, authAdmin, getUserByID);
router.post("/admin", authToken, authAdmin, createAdmin);
router.post("/register", createUser);
router.post("/login", loginUser);
router.patch("/:id", authToken, patchUserByID);
router.delete("/:id", authToken, deleteUserByID);

module.exports = router;
