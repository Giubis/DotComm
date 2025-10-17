import {
  deleteProfile,
  editProfile,
  findUser,
  signInUser,
  signOutUser,
  signUpUser,
  signUpAdmin,
} from "../utils/users";
import { Link } from "react-router-dom";
import { parseJWT } from "../utils/misc/parseJWT";
import { addEvent, findEvent, showMyEvents } from "../utils/events";
import { useContext } from "react";
import UserContext from "../contexts/UserContext";
import EventsContext from "../contexts/EventsContext";

import "../styles/Sidebar.css";

export default function Sidebar() {
  const { events, setEvents } = useContext(EventsContext);
  const { user, setUser, token, setToken } = useContext(UserContext);
  const { id, role } = parseJWT(token) || null;

  const myEvents = user?.events
    ? events.filter((event) => user.events.includes(event._id))
    : [];

  return (
    <>
      <input
        id="hamburger14-input"
        type="checkbox"
        className="hamburger-toggle"
      />
      <label
        htmlFor="hamburger14-input"
        className="hamburger14"
        aria-hidden="true"
      >
        <div className="hamburger14-container">
          <span className="circle" />
          <span className="line line1" />
          <span className="line line2" />
          <span className="line line3" />
        </div>
      </label>

      <aside className="sidebar">
        <img src="./logo.png" alt="Logo" className="sidebar-logo" />

        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/faq">FAQ</Link>
            </li>
          </ul>
        </nav>

        {!user && (
          <div className="auth-section">
            <button onClick={() => signInUser(setUser, setToken)}>
              Sign in
            </button>
            <button onClick={() => signUpUser("", "", setUser, setToken)}>
              Sign up
            </button>
          </div>
        )}

        {user && (
          <div className="user-section">
            <img
              src={user.avatar || "/avatar.webp"}
              alt={user.name || "User"}
              className="user-avatar"
              onError={(event) => (event.currentTarget.src = "/avatar.gif")}
            />
            <h3>{user.username}</h3>
            <button onClick={() => editProfile(user._id, user, setUser)}>
              Edit profile
            </button>
            <button onClick={() => showMyEvents(myEvents)}>My events</button>
            <button onClick={() => deleteProfile(user._id, setUser)}>
              Delete account
            </button>
            <button onClick={() => signOutUser(setUser, setToken)}>
              Sign out
            </button>
          </div>
        )}

        {user && role === "admin" && (
          <div className="admin-section">
            <button onClick={() => signUpAdmin()}>Create staff</button>
            <button onClick={() => findUser(id)}>Edit user</button>
            <button onClick={() => addEvent(events, setEvents)}>
              Create event
            </button>
            <button onClick={() => findEvent(role, events, setEvents)}>
              Edit event
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
