import { addToGoogleCalendar } from "./addToGoogleCalendar";
import { registerUserToEvent } from "../../API";
import Swal from "sweetalert2";

export async function joinEvent(eventID, setUser) {
  try {
    const { isConfirmed } = await Swal.fire({
      icon: "question",
      title: "Hey!",
      text: `Are you sure you want to join this event?`,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    });

    if (!isConfirmed) return;

    const result = await registerUserToEvent(eventID);

    if (setUser) {
      setUser(result.user);
      sessionStorage.setItem("user", JSON.stringify(result.user));
    }

    const res = await Swal.fire({
      icon: "success",
      title: "Joined!",
      text: `${result.user.username} successfully joined the event`,
      confirmButtonText: "Add to Google Calendar",
      showCancelButton: true,
      cancelButtonText: "No, thanks",
    });

    if (res.isConfirmed) {
      window.open(addToGoogleCalendar(result.event), "_blank");
    }

    return result;
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Sorry!",
      text: err.message,
      timer: 3000,
      showConfirmButton: false,
    });
  }
}
