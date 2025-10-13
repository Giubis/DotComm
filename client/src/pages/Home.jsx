import EventsCard from "../components/EventsCard";
import { useNavigate } from "react-router-dom";

import "../styles/Home.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-overlay">
          <h1>Welcome to DotComm!</h1>
          <p>
            Discover the events that are happening soon - stay up to date and
            don’t miss any networking or learning opportunities.
          </p>
          <div className="hero-buttons">
            <button onClick={() => navigate("/events")}>
              Browse all events
            </button>
          </div>
        </div>
      </section>
      <h2>Upcoming Events</h2>
      <EventsCard limit={12} />
    </div>
  );
}
