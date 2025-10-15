import { getEventByID } from "../../API";
import Swal from "sweetalert2";

const fallbackPicture =
  "https://media.istockphoto.com/id/1785808259/photo/networking-opportunities.jpg?s=612x612&w=0&k=20&c=pgrB3Py2KJaOmohj7wRYmIg0frjgSC0nXBBfbDb-HH4=";

export async function showEventDetails(eventID) {
  try {
    const { event } = await getEventByID(eventID);

    await Swal.fire({
      icon: "info",
      title: event.title || "Event Details",
      html: event
        ? `
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
        
        <li>
        <strong>Date:</strong><br />
        <small>${new Date(event.date).toLocaleString(undefined, {
          dateStyle: "medium",
          timeStyle: "short",
        })}</small>
        </li>
        <br />
        <li>
        <strong>Location:</strong><br />
        <small>${event.location || "N/A"}</small>
        </li>
        <br />
        <li>
        <strong>Description:</strong><br />
        <small>${event.description || "No description available"}</small>
        </li>
        </ul>
        `
        : "<p>There are no details for this event yet</p>",
      showConfirmButton: true,
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
