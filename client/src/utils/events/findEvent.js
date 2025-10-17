import { showEventDetails } from "../events";
import Swal from "sweetalert2";

export async function findEvent(role, events, setEvents) {
  try {
    if (!Array.isArray(events) || events.length === 0) {
      return Swal.fire({
        icon: "info",
        title: "Events",
        html: "<p>No events found</p>",
        showConfirmButton: true,
      });
    }

    const renderList = (list) => `
      <ul style="list-style:none; padding:0; text-align:left; max-height:300px; overflow:auto;">
        ${list
          .map(
            (event) => `
            <li 
              class="event-item" 
              data-id="${event._id}" 
              style="margin-bottom:10px; cursor:pointer; padding:5px; border-radius:6px;"
            >
              <strong>${event.title}</strong> 
              <small>(${event.date})</small><br/>
              <small>ID: ${event._id}</small>
            </li>
            <hr/>
          `
          )
          .join("")}
      </ul>
    `;

    await Swal.fire({
      title: "Find event",
      html: `
        <input 
          id="event-search" 
          class="swal2-input" 
          placeholder="Search by title or description" 
          style="margin-bottom:15px;"
        />
        <div id="event-results">
          ${renderList(events)}
        </div>
      `,
      showConfirmButton: true,
      confirmButtonText: "Close",

      didOpen: () => {
        const input = document.getElementById("event-search");
        const results = document.getElementById("event-results");

        input.addEventListener("input", (event) => {
          const query = event.target.value.toLowerCase().trim();
          const filtered = events.filter(
            (event) =>
              event.title.toLowerCase().includes(query) ||
              event.description.toLowerCase().includes(query)
          );
          results.innerHTML = filtered.length
            ? renderList(filtered)
            : "<p>No matching events</p>";
        });

        results.addEventListener("click", (event) => {
          const item = event.target.closest(".event-item");
          if (item) {
            const eventID = item.getAttribute("data-id");
            const event = events.find((event) => event._id === eventID);
            if (event) {
              showEventDetails(role, setEvents, eventID);
            }
          }
        });
      },
    });
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: err.message,
    });
  }
}
