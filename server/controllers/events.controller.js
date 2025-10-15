const Event = require("../models/events.model");
const User = require("../models/users.model");

// GET /events
const getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json({ events });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching events", error: err.message });
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

    res.status(200).json({ event });
  } catch (err) {
    res.status(500).json({
      message: `Error fetching event with ID: ${id}`,
      error: err.message,
    });
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
    res
      .status(400)
      .json({ message: "Error creating event", error: err.message });
  }
};

// PATCH /events/:id
const patchEventByID = async (req, res) => {
  const { id } = req.params;
  const updates = { ...req.body };

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
    res.status(500).json({
      message: `Error updating event with ID: ${id}`,
      error: err.message,
    });
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

    await User.updateMany({ events: id }, { $pull: { events: id } });

    res.status(200).json({ message: "Event successfully deleted", event });
  } catch (err) {
    res.status(500).json({
      message: `Error deleting event with ID: ${id}`,
      error: err.message,
    });
  }
};

// POST /events/:id/register
const registerUserToEvent = async (req, res) => {
  const { id: eventID } = req.params;
  const userID = req.user.id;

  try {
    const event = await Event.findById(eventID);
    const user = await User.findById(userID);

    if (!event) {
      return res
        .status(404)
        .json({ message: `Event with ID ${eventID} not found` });
    }

    if (!user) {
      return res
        .status(404)
        .json({ message: `User with ID ${userID} not found` });
    }

    if (!event.attendees.includes(userID)) {
      event.attendees.push(userID);
      await event.save();
    } else {
      return res
        .status(400)
        .json({ message: "User already registered for this event" });
    }

    if (!user.events.includes(eventID)) {
      user.events.push(eventID);
      await user.save();
    }

    res
      .status(200)
      .json({ message: "User successfully registered for event", event, user });
  } catch (err) {
    res.status(500).json({
      message: "Error registering user for event",
      error: err.message,
    });
  }
};

module.exports = {
  getEvents,
  getEventByID,
  createEvent,
  patchEventByID,
  deleteEventByID,
  registerUserToEvent,
};
