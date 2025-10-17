import { createContext, useState, useEffect } from "react";
import { getEvents } from "../API";

const EventsContext = createContext();

export function EventsProvider({ children }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError(null);
      try {
        const { events } = await getEvents();
        setEvents(events);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <EventsContext.Provider value={{ events, setEvents, loading, error }}>
      {children}
    </EventsContext.Provider>
  );
}

export default EventsContext;
