import { Route, Routes, useLocation } from "react-router-dom";

import Events from "./pages/Events";
import EventPage from "./pages/EventPage";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Sidebar from "./components/Sidebar";

import "./styles/App.css";

export default function App() {
  const location = useLocation();
  const showSidebar = location.pathname !== "/";

  return (
    <div className="app">
      {showSidebar && <Sidebar />}
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/events">
            <Route index element={<Events />} />
            <Route path=":id" element={<EventPage />} />
          </Route>

          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
    </div>
  );
}
