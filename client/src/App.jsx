import FAQ from "./pages/FAQ";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";

import "./styles/App.css";
import "./styles/Swal2.css";

export default function App() {
  return (
    <div className="app">
      <Sidebar />
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}
