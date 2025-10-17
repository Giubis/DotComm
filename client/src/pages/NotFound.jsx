import { Link } from "react-router-dom";
import "../styles/Home.css";

export default function NotFound() {
  return (
    <section
      className="hero"
      style={{
        backgroundImage:
          "url('https://www.thisiscolossal.com/wp-content/uploads/2014/05/diamond.jpg')",
      }}
    >
      <div className="hero-overlay">
        <h1>404 - Page not found</h1>
        <p>
          Our poor wet dog got lost as the page you are looking for does not
          exist.
        </p>
      </div>
    </section>
  );
}
