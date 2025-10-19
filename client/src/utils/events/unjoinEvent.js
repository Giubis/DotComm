import Swal from "sweetalert2";
import { unregisterUserFromEvent } from "../../API";

export async function unjoinEvent(eventID, userID) {
  try {
    Swal.fire({
      title: "Removing...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
      showConfirmButton: false,
    });

    await unregisterUserFromEvent(eventID, userID);

    Swal.fire({
      icon: "success",
      title: "Removed",
      text: "User successfully removed from event",
    });
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: err.message,
    });
  }
}
