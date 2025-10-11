import { login } from "../utils/login";
import { register } from "../utils/register";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { fetchEvents } from "../API";

import "../styles/Home.css";

export default function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const isLoggedIn = false;

  useEffect(() => {
    const getEvents = async () => {
      try {
        const data = await fetchEvents();

        const sortedArray = [
          ...data.events.sort((a, b) => new Date(a.date) - new Date(b.date)),
        ];

        setEvents(sortedArray.slice(0, 10));
      } catch (err) {
        console.error(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    getEvents();
  }, []);

  if (loading) return <p>Loading upcoming events...</p>;

  if (error) return <p>Failed to load events</p>;

  return (
    <div className="home">
      <section>
        <h1>Welcome to DotComm!</h1>
        <p>
          Discover the events that are happening soon! Stay up to date and don’t
          miss any networking or learning opportunities.
        </p>
        <button onClick={() => navigate("/events")}>Browse all events</button>
        <button onClick={() => register()}>Sign up</button>
      </section>

      <section>
        <h2>Upcoming Events:</h2>
        <div>
          {events.map((event) => (
            <div key={event._id}>
              <div>
                <h3>{event.title}</h3>
              </div>

              <p>{event.description}</p>
              <p>{new Date(event.date).toLocaleString()}</p>

              <div>
                <button onClick={() => navigate(`/events/${event._id}`)}>
                  View Details
                </button>
                <button
                  onClick={() =>
                    navigate(
                      isLoggedIn ? `/events/${event._id}/register` : login()
                    )
                  }
                >
                  Register
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
