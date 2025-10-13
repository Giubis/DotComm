import EventsCard from "../components/EventsCard";
import "../styles/Events.css";

function Events() {
  return (
    <div className="events-page">
      <h2>Upcoming Events</h2>
      <EventsCard />
    </div>
  );
}

export default Events;
