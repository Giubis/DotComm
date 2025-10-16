import { getEventByID, patchEventByID } from "../../API";
import Swal from "sweetalert2";

export async function editEvent(id) {
  let event;

  try {
    ({ event } = await getEventByID(id));
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: err.message || "Failed to fetch event",
    });
    return;
  }

  const { value: formValues } = await Swal.fire({
    title: "Edit event",
    html: `
      <input id="swal-title" type="text" class="swal2-input" placeholder="Title" value="${
        event.title || ""
      }">
      <textarea id="swal-description" class="swal2-textarea" placeholder="Description">${
        event.description || ""
      }</textarea>
      <input id="swal-date" type="datetime-local" class="swal2-input" placeholder="Date & Time" value="${
        event.date ? new Date(event.date).toISOString().slice(0, 16) : ""
      }" required>
      <input id="swal-price" type="number" step="0.01" class="swal2-input" placeholder="Price in £" value="${
        event.price || 0
      }">
      <input id="swal-location" type="text" class="swal2-input" placeholder="Location" value="${
        event.location || ""
      }">
      <input id="swal-image" type="url" class="swal2-input" placeholder="Image URL" value="${
        event.image || ""
      }">
      <input id="swal-capacity" type="number" class="swal2-input" placeholder="Capacity" value="${
        event.capacity || 0
      }">
    `,
    focusConfirm: false,
    confirmButtonText: "Save",
    showCancelButton: true,
    cancelButtonText: "Cancel",
    preConfirm: () => {
      const title = document.getElementById("swal-title").value.trim();
      const description = document
        .getElementById("swal-description")
        .value.trim();
      const date = document.getElementById("swal-date").value;
      const price = document.getElementById("swal-price").value;
      const location = document.getElementById("swal-location").value.trim();
      const image = document.getElementById("swal-image").value.trim();
      const capacity = document.getElementById("swal-capacity").value;

      if (!title || !date) {
        Swal.showValidationMessage("Title and Date are mandatory");
        return false;
      }

      if (price && parseFloat(price) < 0) {
        Swal.showValidationMessage("Price must be a positive number");
        return false;
      }

      if (capacity && parseInt(capacity) < 0) {
        Swal.showValidationMessage("Capacity must be a positive number");
        return false;
      }

      return {
        title,
        description,
        date,
        price: price ? parseFloat(price) : 0,
        location,
        image,
        capacity: capacity ? parseInt(capacity) : 0,
      };
    },
  });

  if (!formValues) return;

  try {
    Swal.fire({
      title: "Modifying event...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    const result = await patchEventByID(id, formValues);

    Swal.close();

    Swal.fire({
      icon: "success",
      title: "Success!",
      text: `Event "${result.event.title}" modified successfully`,
      timer: 3000,
      showConfirmButton: false,
    });
  } catch (err) {
    Swal.close();
    Swal.fire({
      icon: "error",
      title: "Error",
      text: err.message || "Failed to modify event",
    });
  }
}
