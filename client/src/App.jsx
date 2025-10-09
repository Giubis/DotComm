import { Route, Routes } from "react-router-dom";

import Events from "./pages/Events";
import EventPage from "./pages/EventPage";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Sidebar from "./components/Sidebar";
import "./styles/App.css";

function App() {
  return (
    <div className="app">
      <Sidebar />
      <main className="main-content">
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

export default App;
