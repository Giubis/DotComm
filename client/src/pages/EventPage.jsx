import { fetchEventByID } from "../API";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "../styles/EventPage.css";

function EventPage() {
  const [error, setError] = useState(null);
  const [event, setEvent] = useState(null);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getEvent = async () => {
      try {
        const data = await fetchEventByID(id);
        setEvent(data.event);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getEvent();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!event) {
    return <p>Event not found</p>;
  }

  return (
    <div className="event-page">
      <button className="back-button" onClick={() => navigate("/events")}>
        ← Back to Events
      </button>

      <h1>{event.title}</h1>
      <p>{event.description}</p>

      <div className="event-details">
        <div className="event-meta">
          <p>
            <strong>Date:</strong> {new Date(event.date).toLocaleString()}
          </p>
          <p>
            <strong>Location:</strong> {event.location}
          </p>
          <p>
            <strong>Price:</strong>{" "}
            {event.price > 0 ? `$${event.price}` : "Free"}
          </p>
          <p>
            <strong>Attendees:</strong> {event.attendees.length}
          </p>
        </div>
      </div>
    </div>
  );
}

export default EventPage;
