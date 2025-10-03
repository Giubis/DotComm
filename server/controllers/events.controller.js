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

// GET /events/:id
const getEventByID = async (req, res) => {
  const { id } = req.params;

  try {
    const event = await Event.findById(id);

    if (!event) {
      return res
        .status(404)
        .json({ message: `Event with ID ${id} does not exist` });
    }

    res.json(event);
  } catch (err) {
    res
      .status(500)
      .json({ message: `Error fetching event with ID: ${id}`, error: err });
  }
};

// POST /events
const createEvent = async (req, res) => {
  try {
    const event = await Event.create(req.body);
    res
      .status(201)
      .json({ message: "Event successfully created", event: event });
  } catch (err) {
    res.status(400).json({ message: "Error creating event", error: err });
  }
};

// PATCH /events/:id
const patchEventByID = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const event = await Event.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!event) {
      return res
        .status(404)
        .json({ message: `Event with ID ${id} does not exist` });
    }

    res
      .status(200)
      .json({ message: "Event successfully updated", event: event });
  } catch (err) {
    res
      .status(500)
      .json({ message: `Error updating event with ID: ${id}`, error: err });
  }
};

// DELETE /events/:id
const deleteEventByID = async (req, res) => {
  const { id } = req.params;

  try {
    const event = await Event.findByIdAndDelete(id);

    if (!event) {
      return res
        .status(404)
        .json({ message: `Event with ID ${id} does not exist` });
    }

    res.status(200).json({ message: "Event successfully deleted", event });
  } catch (err) {
    res
      .status(500)
      .json({ message: `Error deleting event with ID: ${id}`, error: err });
  }
};

module.exports = {
  getEvents,
  getEventByID,
  createEvent,
  patchEventByID,
  deleteEventByID,
};
