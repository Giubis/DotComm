const express = require("express");
const { getEvents, createEvent } = require("../controllers/events.controller");

const router = express.Router();

router.get("/", getEvents);
router.post("/", createEvent);

module.exports = router;
