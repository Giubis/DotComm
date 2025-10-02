const Event = require("../models/events.model");

// GET /events
const getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: "Error fetching events", error: err });
  }
};

// POST /events
const createEvent = async (req, res) => {
  try {
    const newEvent = await Event.create(req.body);
    res
      .status(201)
      .json({ message: "Event successfully created", event: newEvent });
  } catch (err) {
    res.status(400).json({ message: "Error creating event", error: err });
  }
};

module.exports = { getEvents, createEvent };
