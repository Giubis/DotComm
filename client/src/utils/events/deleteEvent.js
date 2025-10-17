import { deleteEventByID } from "../../API";
import Swal from "sweetalert2";

export async function deleteEvent(ID, setEvents) {
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

  if (!result.isConfirmed) {
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
    await deleteEventByID(ID);

    setEvents((previousEvents) =>
      previousEvents.filter((event) => event._id !== ID)
    );

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
