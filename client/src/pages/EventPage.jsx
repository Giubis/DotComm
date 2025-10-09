import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchEvent } from "../API";

function EventPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getEvent = async () => {
      try {
        const data = await fetchEvent(id);
        setEvent(data.event);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getEvent();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!event) return <p>Event not found</p>;

  return (
    <div>
      <h1>{event.title}</h1>
      <p>{event.description}</p>
      <p>Date: {event.date}</p>
      <p>Location: {event.location}</p>
      <p>Price: {event.price > 0 ? `$${event.price}` : "Free"}</p>
    </div>
  );
}

export default EventPage;
