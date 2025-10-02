const getEvents = (req, res) => {
  res.json([
    { id: 1, title: "Yoga in the Park", date: "2025-10-05", price: 0 },
    { id: 2, title: "Community Dinner", date: "2025-10-10", price: 10 },
  ]);
};

const createEvent = (req, res) => {
  console.log("TEST");
  const newEvent = req.body;
  res
    .status(201)
    .json({ message: "Event successfully created", event: newEvent });
};

module.exports = { getEvents, createEvent };
