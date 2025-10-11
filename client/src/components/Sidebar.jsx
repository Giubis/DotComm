import { Link } from "react-router-dom";
import { useState } from "react";

import "../styles/Sidebar.css";

export default function Sidebar() {
  const [user, _] = useState({
    name: "John Doe",
    avatar: "https://i.pravatar.cc/100?img=3",
  });

  return (
    <aside className="sidebar">
      {user && (
        <div className="user-info">
          <img src={user.avatar} alt={user.name} className="user-avatar" />
          <h3>{user.name}</h3>
        </div>
      )}

      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/events">Events</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
