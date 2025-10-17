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

    if (!isConfirmed) {
      return;
    }

    Swal.fire({
      title: "Joining...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
      showConfirmButton: false,
    });

    const result = await registerUserToEvent(eventID);

    if (setUser) {
      setUser(result.user);
      sessionStorage.setItem("user", JSON.stringify(result.user));
    }

    const res = await Swal.fire({
      icon: "success",
      title: "Joined!",
      text: `${result.user.username} successfully joined the event`,
      confirmButtonText: "Add to Google calendar",
      showCancelButton: true,
      cancelButtonText: "No, thanks",
    });

    if (res.isConfirmed) {
      try {
        Swal.fire({
          title: "Redirecting to Google...",
          allowOutsideClick: false,
          didOpen: () => Swal.showLoading(),
          showConfirmButton: false,
        });

        setTimeout(() => {
          Swal.close();
          window.open(addToGoogleCalendar(result.event), "_blank");
        }, 3000);
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: err.message,
        });
      }
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
