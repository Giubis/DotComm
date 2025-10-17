import EventsCard from "../components/EventsCard";
import "../styles/Home.css";

export default function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-overlay">
          <h1>Welcome to DotComm!</h1>
          <p>
            Discover upcoming events and stay up to date on networking and
            learning opportunities.
          </p>
        </div>
      </section>
      <EventsCard />
    </div>
  );
}
