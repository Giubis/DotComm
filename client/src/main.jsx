import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { EventsProvider } from "./contexts/EventsContext.jsx";
import { StrictMode } from "react";
import { UserProvider } from "./contexts/UserContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <EventsProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </EventsProvider>
    </UserProvider>
  </StrictMode>
);
