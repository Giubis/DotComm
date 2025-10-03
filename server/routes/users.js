const express = require("express");
const {
  getUsers,
  getUserByID,
  createUser,
  patchUserByID,
  deleteUserByID,
} = require("../controllers/users.controller");

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUserByID);
router.post("/", createUser);
router.patch("/:id", patchUserByID);
router.delete("/:id", deleteUserByID);

module.exports = router;
