import EventsContext from "../contexts/EventsContext";
import { joinEvent, showEventDetails } from "../utils/events";
import { parseJWT } from "../utils/misc/parseJWT";
import { signInUser } from "../utils/users";
import Swal from "sweetalert2";
import { useContext, useEffect, useMemo, useState } from "react";
import UserContext from "../contexts/UserContext";

import "../styles/EventsCard.css";

export default function EventsCard() {
  const { events, setEvents, loading, error } = useContext(EventsContext);
  const { user, setUser, token } = useContext(UserContext);
  const [query, setQuery] = useState("");

  const { role } = parseJWT(token) || {};

  const now = useMemo(() => new Date(), []);

  useEffect(() => {
    if (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    }
  }, [error]);

  const filteredEvents = useMemo(() => {
    return events
      .filter(
        (event) =>
          event.title.toLowerCase().includes(query.toLowerCase().trim()) ||
          (event.description || "")
            .toLowerCase()
            .includes(query.toLowerCase().trim())
      )
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [events, query]);

  const upcomingEvents = useMemo(
    () => filteredEvents.filter((event) => new Date(event.date) >= now),
    [filteredEvents, now]
  );

  const pastEvents = useMemo(
    () => filteredEvents.filter((event) => new Date(event.date) < now),
    [filteredEvents, now]
  );

  const renderEventCard = (event, isPast = false) => {
    const eventDate = new Date(event.date);
    const remainingDays = Math.ceil((eventDate - now) / (1000 * 60 * 60 * 24));
    const totalDays = 30;
    const progress = Math.min(
      100,
      Math.max(0, (remainingDays / totalDays) * 100)
    );

    let countdownColor;

    if (!isPast) {
      if (remainingDays > 20) countdownColor = "#0affaa";
      else if (remainingDays > 10) countdownColor = "#ff9f0a";
      else countdownColor = "#ff3b30";
    }

    return (
      <div key={event._id} className="event-card">
        <div className="event-image">
          <img
            src={event.image || "/event.gif"}
            alt={event.title || "Event"}
            onError={(e) => (e.currentTarget.src = "/event.gif")}
          />
        </div>
        <div className="event-info">
          <h3>{event.title}</h3>
          <p className="event-date">{eventDate.toLocaleString()}</p>
          <p className="event-description">{event.description}</p>
        </div>
        <div className="event-actions">
          <button onClick={() => showEventDetails(role, setEvents, event._id)}>
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

  if (loading) {
    return (
      <div className="loader-wrapper">
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <section className="events-section">
      <input
        type="text"
        placeholder="Search events..."
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />

      {filteredEvents.length === 0 ? (
        <p className="no-events">No events found for "{query}"</p>
      ) : (
        <>
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
        </>
      )}
    </section>
  );
}
