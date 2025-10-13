require("dotenv").config();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Event = require("../models/events.model");
const User = require("../models/users.model");

// GET /users
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching users", error: err.message });
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

    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({
      message: `Error fetching user with ID: ${id}`,
      error: err.message,
    });
  }
};

// POST /users
const createAdmin = async (req, res) => {
  try {
    const { name, username, email, password, ...rest } = req.body;

    if (!name || !username || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, username, email, and password are mandatory" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      username,
      email,
      password: hashedPassword,
      role: "admin",
      ...rest,
    });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const registeredUser = {
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      birthday: user.birthday,
      phone: user.phone,
      bio: user.bio,
    };

    res.status(201).json({
      message: "Registration successful",
      user: registeredUser,
      token,
    });
  } catch (err) {
    res.status(500).json({ message: "Registration error", error: err.message });
  }
};

// POST /users/register
const createUser = async (req, res) => {
  try {
    const { name, username, email, password, ...rest } = req.body;

    if (!name || !username || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, username, email, and password are mandatory" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      username,
      email,
      password: hashedPassword,
      role: "user",
      ...rest,
    });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const registeredUser = {
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      birthday: user.birthday,
      phone: user.phone,
      bio: user.bio,
    };

    res.status(201).json({
      message: "Registration successful",
      user: registeredUser,
      token,
    });
  } catch (err) {
    if (err.code === 11000 && err.keyPattern?.username) {
      return res.status(400).json({ message: "Username already exists" });
    }

    res.status(500).json({ message: "Registration error", error: err.message });
  }
};

// POST /users/login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are mandatory" });
    }

    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const validUser = {
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      birthday: user.birthday,
      phone: user.phone,
      bio: user.bio,
      events: user.events,
    };

    res
      .status(200)
      .json({ message: "Login successful", user: validUser, token });
  } catch (err) {
    res.status(500).json({ message: "Login error", error: err.message });
  }
};

// PATCH /users/:id
const patchUserByID = async (req, res) => {
  const { id } = req.params;
  const updates = { ...req.body };
  const userID = req.user.id;
  const userRole = req.user.role;

  try {
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }

    if (userID !== id && userRole !== "admin") {
      return res.status(403).json({ message: "Insufficient privileges" });
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

    res.status(200).json({ message: "User successfully updated", user });
  } catch (err) {
    res.status(500).json({
      message: `Error updating user with ID: ${id}`,
      error: err.message,
    });
  }
};

// DELETE /users/:id
const deleteUserByID = async (req, res) => {
  const { id } = req.params;
  const userID = req.user.id;
  const userRole = req.user.role;

  try {
    if (userID !== id && userRole !== "admin") {
      return res.status(403).json({ message: "Insufficient privileges" });
    }

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res
        .status(404)
        .json({ message: `User with ID ${id} does not exist` });
    }

    await Event.updateMany({ attendees: id }, { $pull: { attendees: id } });

    res.status(200).json({ message: "User successfully deleted", user });
  } catch (err) {
    res.status(500).json({
      message: `Error deleting user with ID: ${id}`,
      error: err.message,
    });
  }
};

module.exports = {
  getUsers,
  getUserByID,
  createAdmin,
  createUser,
  loginUser,
  patchUserByID,
  deleteUserByID,
};
