import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { fetchEvents } from "../API";

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getEvents = async () => {
      try {
        const data = await fetchEvents();
        setEvents(data.events);
      } catch (err) {
        console.error(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    getEvents();
  }, []);

  if (loading) return <p>Loading events...</p>;
  if (error) return <p>Error loading events</p>;

  return (
    <div>
      <h1>Events</h1>
      <ul>
        {events.map((event) => (
          <li key={event._id}>
            <Link to={`/events/${event._id}`}>{event.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Events;
