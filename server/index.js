const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const eventsRouter = require("./routes/events");

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/events", eventsRouter);

// Root
app.get("/", (req, res) => {
  res.send("Server DotComm is now running");
});

// Database connection
const databaseConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Successfully connected");
  } catch (err) {
    console.error("Connection error:", err);
  }
};

databaseConnection();

// Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
