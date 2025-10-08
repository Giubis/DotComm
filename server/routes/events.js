const express = require("express");
const { authToken, authAdmin } = require("../middlewares/authentication");
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
router.post("/", authToken, authAdmin, createEvent);
router.post("/:id/register", authToken, registerUserToEvent);
router.patch("/:id", authToken, authAdmin, patchEventByID);
router.delete("/:id", authToken, authAdmin, deleteEventByID);

module.exports = router;
