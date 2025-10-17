import { getEvents } from "../API";
import { joinEvent, showEventDetails } from "../utils/events";
import { parseJWT } from "../utils/misc/parseJWT";
import { signInUser } from "../utils/users";
import { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";

import "../styles/EventsCard.css";

export default function EventsCard() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const { user, setUser, token } = useContext(UserContext);

  const { role } = parseJWT(token) || null;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { events } = await getEvents();
        const sorted = events.sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );
        setEvents(sorted);
      } catch (err) {
        console.error(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const now = new Date();

  const filteredEvents = events.filter(
    (event) =>
      event.title.toLowerCase().includes(query.toLowerCase().trim()) ||
      (event.description || "")
        .toLowerCase()
        .includes(query.toLowerCase().trim())
  );

  const upcomingEvents = filteredEvents.filter(
    (event) => new Date(event.date) >= now
  );

  const pastEvents = filteredEvents.filter(
    (event) => new Date(event.date) < now
  );

  if (loading) {
    return <span className="loader"></span>;
  }

  if (error) {
    return <p>Failed to load events</p>;
  }

  const renderEventCard = (event, isPast = false) => {
    const eventDate = new Date(event.date);
    const remainingDays = Math.ceil((eventDate - now) / (1000 * 60 * 60 * 24));
    const totalDays = 30;
    const progress = Math.min(
      100,
      Math.max(0, (remainingDays / totalDays) * 100)
    );

    let countdownColor = "#0affaa";

    if (!isPast) {
      if (remainingDays > 20) {
        countdownColor = "#0affaa";
      } else if (remainingDays > 10) {
        countdownColor = "#ff9f0a";
      } else {
        countdownColor = "#ff3b30";
      }
    }

    return (
      <div key={event._id} className="event-card">
        {event.image && (
          <div
            className="event-image"
            style={{ backgroundImage: `url(${event.image})` }}
          />
        )}
        <div className="event-info">
          <h3>{event.title}</h3>
          <p className="event-date">{eventDate.toLocaleString()}</p>
          <p className="event-description">{event.description}</p>
        </div>
        <div className="event-actions">
          <button onClick={() => showEventDetails(event._id, role)}>
            View Details
          </button>
          {!isPast && (
            <button
              onClick={() =>
                user ? joinEvent(event._id, setUser) : signInUser(setUser)
              }
            >
              Join
            </button>
          )}
        </div>
        {!isPast && (
          <div
            className="event-progress"
            style={{ width: `${progress}%`, backgroundColor: countdownColor }}
          />
        )}
      </div>
    );
  };

  return (
    <section className="events-section">
      <input
        type="text"
        placeholder="Search events..."
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      {upcomingEvents.length > 0 && (
        <>
          <h2>Upcoming Events</h2>
          <div className="events-grid">
            {upcomingEvents.map((event) => renderEventCard(event))}
          </div>
        </>
      )}
      {pastEvents.length > 0 && (
        <>
          <h2>Past Events</h2>
          <div className="events-grid">
            {pastEvents.map((event) => renderEventCard(event, true))}
          </div>
        </>
      )}
      {filteredEvents.length === 0 && <p>No events found</p>}
    </section>
  );
}
