import { getEventByID } from "../../API";
import { editEvent } from "./editEvent";
import { deleteEvent } from "./deleteEvent";
import Swal from "sweetalert2";

export async function showEventDetails(role, setEvents, eventID) {
  if (!eventID) {
    return Swal.fire({
      icon: "error",
      title: "Error",
      text: "Event ID is missing",
    });
  }

  try {
    const { event } = await getEventByID(eventID);
    const isAdmin = role === "admin";

    await Swal.fire({
      customClass: {
        popup: "swal2-popup",
        title: "swal2-title",
        confirmButton: "swal2-confirm",
        cancelButton: "swal2-cancel",
        denyButton: "swal2-deny",
      },
      icon: "info",
      title: event.title || "Event Details",
      html: `
        <ul class="swal-event-list">
          <li class="swal-event-image">
            <img src="${event.image || "/event.gif"}" alt="Event picture">
          </li>
          <li><strong>Date:</strong><br /><small>${new Date(
            event.date
          ).toLocaleString(undefined, {
            dateStyle: "medium",
            timeStyle: "short",
          })}</small></li>
          <hr />
          <li><strong>Location:</strong><br /><small>${
            event.location || "N/A"
          }</small></li>
          <hr />
          <li><strong>Description:</strong><br /><small>${
            event.description || "No description available"
          }</small></li>
          <hr />
        </ul>

        ${
          isAdmin
            ? `<div class="swal-event-actions">
                 <button id="edit-event" class="swal2-confirm swal2-styled">Edit</button>
                 <button id="delete-event" class="swal2-deny swal2-styled">Delete</button>
                 <button id="cancel-event" class="swal2-cancel swal2-styled">Cancel</button>
               </div>`
            : ""
        }
      `,
      showConfirmButton: !isAdmin,
      didOpen: () => {
        if (!isAdmin) return;

        const editButton = document.getElementById("edit-event");
        const deleteButton = document.getElementById("delete-event");
        const cancelButton = document.getElementById("cancel-event");

        editButton.addEventListener("click", async () => {
          Swal.close();
          const { event: updatedEvent } = await editEvent(eventID);

          if (updatedEvent) {
            setEvents((previousEvents) =>
              previousEvents.map((event) =>
                event._id === eventID ? updatedEvent : event
              )
            );

            Swal.fire({
              icon: "success",
              title: "Updated",
              text: `"${event.title}" updated successfully`,
              timer: 3000,
              showConfirmButton: false,
            });
          }
        });

        deleteButton.addEventListener("click", async () => {
          Swal.close();
          const deleted = await deleteEvent(eventID, setEvents);

          if (deleted) {
            setEvents((previousEvents) =>
              previousEvents.filter((event) => event._id !== eventID)
            );

            Swal.fire({
              icon: "success",
              title: "Deleted",
              text: "Event successfully deleted",
              timer: 3000,
              showConfirmButton: false,
            });
          }
        });

        cancelButton.addEventListener("click", () => Swal.close());
      },
    });
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: err.message,
      showConfirmButton: true,
    });
  }
}
