import { fetchEvents } from "../API";
import { joinEvent } from "../utils/joinEvent";
import { login } from "../utils/login";
import { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

export default function EventsCard({ limit }) {
  const [error, setError] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const getEvents = async () => {
      try {
        const data = await fetchEvents();

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

    getEvents();
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
              <button onClick={() => navigate(`/events/${event._id}`)}>
                View Details
              </button>
              <button
                onClick={() =>
                  user ? joinEvent(event._id, setUser) : login(setUser)
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
