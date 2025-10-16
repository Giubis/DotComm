import { getEventByID } from "../../API";
import { editEvent } from "./editEvent";
import { deleteEvent } from "./deleteEvent";
import Swal from "sweetalert2";

const fallbackPicture =
  "https://media.istockphoto.com/id/1785808259/photo/networking-opportunities.jpg?s=612x612&w=0&k=20&c=pgrB3Py2KJaOmohj7wRYmIg0frjgSC0nXBBfbDb-HH4=";

export async function showEventDetails(eventID, role) {
  try {
    const { event } = await getEventByID(eventID);
    const isAdmin = role === "admin";

    await Swal.fire({
      icon: "info",
      title: event.title || "Event Details",
      html: `
        <ul style="list-style:none; padding:0; margin:0; justify-content:center">
          <li style="margin-bottom:20px; width:200px; height:200px; border-radius:50%; border:1px solid black; overflow:hidden; position:relative; display:inline-flex; align-items:center; justify-content:center;">
            <div id="img-loader" class="loader" style="position:absolute;"></div>
            <img id="event-img"
              src="${event.image}"
              alt="Event picture"
              style="width:100%; height:100%; object-fit:cover; display:none; border-radius:50%;"
              onload="document.getElementById('img-loader').style.display='none'; this.style.display='block';"
              onerror="this.onerror=null; this.src='${fallbackPicture}';">
          </li>
          <br />
          <br />
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
          <br />
        </ul>

        ${
          isAdmin
            ? `<div style="display:flex; justify-content:center; gap:10px; margin-top:15px;">
                 <button id="edit-event" class="swal2-confirm swal2-styled">Edit</button>
                 <button id="delete-event" class="swal2-deny swal2-styled">Delete</button>
                 <button id="cancel-event" class="swal2-cancel swal2-styled">Cancel</button>
               </div>`
            : ""
        }
      `,
      showConfirmButton: !isAdmin,
      didOpen: () => {
        if (isAdmin) {
          const editBtn = document.getElementById("edit-event");
          const deleteBtn = document.getElementById("delete-event");
          const cancelBtn = document.getElementById("cancel-event");

          editBtn.addEventListener("click", () => {
            Swal.close();
            editEvent(event._id);
          });

          deleteBtn.addEventListener("click", () => {
            Swal.close();
            deleteEvent(event._id);
          });

          cancelBtn.addEventListener("click", () => Swal.close());
        }
      },
    });
  } catch (err) {
    await Swal.fire({
      icon: "error",
      title: "Sorry!",
      text: err.message,
      showConfirmButton: true,
    });
  }
}
