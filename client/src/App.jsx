import Events from "./pages/Events";
import EventPage from "./pages/EventPage";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";

import "./styles/App.css";

export default function App() {
  return (
    <div className="app">
      <Sidebar />

      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/events">
            <Route index element={<Events />} />
            <Route path=":id" element={<EventPage />} />
          </Route>
        </Routes>
      </main>
    </div>
  );
}
