import { Link } from "react-router-dom";

import "../styles/Sidebar.css";

function Sidebar() {
  return (
    <aside className="sidebar">
      <h2>DotComm</h2>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/events">Events</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
