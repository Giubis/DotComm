import { deleteEventByID } from "../../API";
import Swal from "sweetalert2";

export async function deleteEvent(id) {
  const result = await Swal.fire({
    icon: "warning",
    title: "Are you sure?",
    text: "This action cannot be undone!",
    confirmButtonText: "Yes, delete this event",
    showCancelButton: true,
    reverseButtons: true,
    customClass: {
      popup: "shake",
    },
  });

  if (result.isDismissed) {
    await Swal.fire({
      icon: "info",
      title: "Aborted",
      text: "The event has not been deleted",
      timer: 3000,
      showConfirmButton: false,
      timerProgressBar: true,
    });
    return;
  }

  Swal.fire({
    title: "Deleting...",
    allowOutsideClick: false,
    didOpen: () => Swal.showLoading(),
  });

  try {
    await deleteEventByID(id);

    Swal.close();

    await Swal.fire({
      icon: "success",
      title: "Event deleted",
      text: "This event has been successfully deleted",
      timer: 3000,
      showConfirmButton: false,
    });
  } catch (err) {
    Swal.close();

    await Swal.fire({
      icon: "error",
      title: "Error",
      text: err.message,
    });
  }
}
