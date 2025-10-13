import { editUser } from "../utils/editUser";
import { fetchEventByID } from "../API";
import { Link } from "react-router-dom";
import { login } from "../utils/login";
import { logout } from "../utils/logout";
import { register } from "../utils/register";
import { showMyEvents } from "../utils/showMyEvents";
import { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";

import "../styles/Sidebar.css";

export default function Sidebar() {
  const [myEvents, setMyEvents] = useState([]);
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const getMyEvents = async () => {
      if (!user?.events?.length) {
        return;
      }

      try {
        const events = await Promise.all(
          user.events.map((id) => fetchEventByID(id))
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
            <button onClick={() => login(setUser)}>Sign in</button>
            <button onClick={() => register("", "", setUser)}>Sign up</button>
          </div>
        )}

        {user && (
          <div className="user-section">
            <div className="user-info">
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
              <h3>{user.name}</h3>
              <h3>{user.username}</h3>
              <button onClick={() => editUser(user._id, user, setUser)}>
                Edit profile
              </button>
              <button onClick={() => showMyEvents(myEvents)}>My events</button>
              <button onClick={() => logout(setUser)}>Logout</button>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
