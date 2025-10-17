import {
  deleteProfile,
  editProfile,
  findUser,
  signInUser,
  signOutUser,
  signUpUser,
  signUpAdmin,
} from "../utils/users";
import { getEventByID } from "../API";
import { Link } from "react-router-dom";
import { parseJWT } from "../utils/misc/parseJWT";
import { addEvent, findEvent, showMyEvents } from "../utils/events";
import { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";

import "../styles/Sidebar.css";

export default function Sidebar() {
  const [myEvents, setMyEvents] = useState([]);
  const { user, setUser, token, setToken } = useContext(UserContext);
  const { role } = parseJWT(token) || null;

  useEffect(() => {
    const getMyEvents = async () => {
      if (!user?.events?.length) {
        return;
      }

      try {
        const events = await Promise.all(
          user.events.map((id) => getEventByID(id))
        );

        setMyEvents(events);
      } catch (err) {
        console.error(err);
      }
    };

    getMyEvents();
  }, [user]);

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
              src={
                user.avatar ||
                "https://pbs.twimg.com/profile_images/1237550450/mstom_400x400.jpg"
              }
              alt={user.name || "User"}
              className="user-avatar"
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
              Logout
            </button>
          </div>
        )}

        {user && role === "admin" && (
          <div className="admin-section">
            <button onClick={() => signUpAdmin()}>Create staff</button>
            <button onClick={() => findUser()}>Edit user</button>
            <button onClick={() => addEvent()}>Create event</button>
            <button onClick={() => findEvent(role)}>Edit event</button>
          </div>
        )}
      </aside>
    </>
  );
}
