const cors = require("cors");
const express = require("express");
require("dotenv").config();

const eventsRouter = require("./routes/events");

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/events", eventsRouter);

// Root
app.get("/", (req, res) => {
  res.send("Server DotComm is now running");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
