const bcrypt = require("bcrypt");
const User = require("../models/users.model");

// GET /users
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users", error: err });
  }
};

// GET /users/:id
const getUserByID = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res
        .status(404)
        .json({ message: `User with ID ${id} does not exist` });
    }

    res.json(user);
  } catch (err) {
    res
      .status(500)
      .json({ message: `Error fetching user with ID: ${id}`, error: err });
  }
};

// POST /users
const createUser = async (req, res) => {
  try {
    const { password, ...rest } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ ...rest, password: hashedPassword });

    res.status(201).json({ message: "User successfully created", user: user });
  } catch (err) {
    res.status(400).json({ message: "Error creating user", error: err });
  }
};

// PATCH /users/:id
const patchUserByID = async (req, res) => {
  const { id } = req.params;
  const updates = { ...req.body };

  try {
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }

    const user = await User.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res
        .status(404)
        .json({ message: `User with ID ${id} does not exist` });
    }

    res.status(200).json({ message: "User successfully updated", user: user });
  } catch (err) {
    res
      .status(500)
      .json({ message: `Error updating user with ID: ${id}`, error: err });
  }
};

// DELETE /users/:id
const deleteUserByID = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res
        .status(404)
        .json({ message: `User with ID ${id} does not exist` });
    }

    res.status(200).json({ message: "User successfully deleted", user: user });
  } catch (err) {
    res
      .status(500)
      .json({ message: `Error deleting user with ID: ${id}`, error: err });
  }
};

module.exports = {
  getUsers,
  getUserByID,
  createUser,
  patchUserByID,
  deleteUserByID,
};
