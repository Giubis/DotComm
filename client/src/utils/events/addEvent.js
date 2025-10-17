import { createEvent } from "../../API";
import Swal from "sweetalert2";

export async function addEvent(events, setEvents) {
  const { value: formValues } = await Swal.fire({
    title: "Add Event",
    html: `
      <input id="swal-title" type="text" class="swal2-input" placeholder="Title" required>
      <textarea id="swal-description" class="swal2-textarea" placeholder="Description"></textarea>
      <input id="swal-date" type="datetime-local" class="swal2-input" placeholder="Date & Time" required>
      <input id="swal-price" type="number" step="0.01" class="swal2-input" placeholder="Price in £">
      <input id="swal-location" type="text" class="swal2-input" placeholder="Location">
      <input id="swal-image" type="url" class="swal2-input" placeholder="Image URL">
      <input id="swal-capacity" type="number" class="swal2-input" placeholder="Capacity">
    `,
    focusConfirm: false,
    confirmButtonText: "Create",
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
      title: "Creating...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    const result = await createEvent(formValues);

    setEvents([...events, result.event]);

    Swal.close();

    Swal.fire({
      icon: "success",
      title: "Success!",
      text: `Event "${result.event.title}" created successfully`,
      timer: 3000,
      showConfirmButton: false,
    });
  } catch (err) {
    Swal.close();
    Swal.fire({
      icon: "error",
      title: "Error",
      text: err.message,
    });
  }
}
