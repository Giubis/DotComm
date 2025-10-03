const express = require("express");
const {
  getEvents,
  getEventByID,
  createEvent,
  patchEventByID,
  deleteEventByID,
  registerUserToEvent,
} = require("../controllers/events.controller");

const router = express.Router();

router.get("/", getEvents);
router.get("/:id", getEventByID);
router.post("/", createEvent);
router.post("/:id/register", registerUserToEvent);
router.patch("/:id", patchEventByID);
router.delete("/:id", deleteEventByID);

module.exports = router;
