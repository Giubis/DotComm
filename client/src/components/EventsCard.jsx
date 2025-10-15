import { getEvents } from "../API";
import { joinEvent, showEventDetails } from "../utils/events";
import { signInUser } from "../utils/users";
import { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";

export default function EventsCard({ limit }) {
  const [error, setError] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getEvents();

        const sortedArray = [
          ...data.events.sort((a, b) => new Date(a.date) - new Date(b.date)),
        ];

        setEvents(limit ? sortedArray.slice(0, limit) : sortedArray);
      } catch (err) {
        console.error(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [limit]);

  if (loading) {
    return <span className="loader"></span>;
  }

  if (error) {
    return <p>Failed to load events</p>;
  }

  return (
    <section className="events-section">
      <div className="events-grid">
        {events.map((event) => (
          <div className="event-card" key={event._id}>
            <div className="event-info">
              <h3>{event.title}</h3>
              <p className="event-date">
                {new Date(event.date).toLocaleString()}
              </p>
              <p className="event-description">{event.description}</p>
            </div>
            <div className="event-actions">
              <button onClick={() => showEventDetails(event._id)}>
                View Details
              </button>
              <button
                onClick={() =>
                  user ? joinEvent(event._id, setUser) : signInUser(setUser)
                }
              >
                Join
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
