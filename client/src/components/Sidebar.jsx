import { deleteUser, editUser, login, logout, register } from "../utils/users";
import { getEventByID } from "../API";
import { Link } from "react-router-dom";
import { parseJWT } from "../utils/misc/parseJWT";
import { showMyEvents } from "../utils/events";
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
      <aside className="sidebar">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/events">Events</Link>
            </li>
            <li>
              <Link to="/faq">FAQ</Link>
            </li>
          </ul>
        </nav>

        {!user && (
          <div className="auth-section">
            <hr />
            <br />
            <button onClick={() => login(setUser, setToken)}>Sign in</button>
            <button onClick={() => register("", "", setUser, setToken)}>
              Sign up
            </button>
          </div>
        )}

        {user && (
          <div className="user-section">
            <hr />
            <br />
            <img
              src={
                user.avatar ||
                "https://pbs.twimg.com/profile_images/1237550450/mstom_400x400.jpg"
              }
              alt={user.name || "User"}
              className="user-avatar"
            />
            <h3>{user.username}</h3>
            <button onClick={() => editUser(user._id, user, setUser)}>
              Edit profile
            </button>
            <button onClick={() => showMyEvents(myEvents)}>My events</button>
            <button onClick={() => deleteUser(user._id, setUser)}>
              Delete account
            </button>
            <button onClick={() => logout(setUser, setToken)}>Logout</button>
          </div>
        )}

        {user && role === "admin" && (
          <div className="user-section">
            <hr />
            <br />
            <button>Create staff</button>
            <button>Edit user</button>
            <button>Delete user</button>
            <button>Create event</button>
            <button>Edit event</button>
          </div>
        )}
      </aside>
    </>
  );
}
