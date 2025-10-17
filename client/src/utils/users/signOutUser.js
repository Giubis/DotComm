import { signInUser } from ".";
import Swal from "sweetalert2";

export async function signOutUser(setUser, setToken, sessionExpired = false) {
  if (setUser) {
    setUser(null);
  }

  if (setToken) {
    setToken(null);
  }

  sessionStorage.clear();

  if (sessionExpired) {
    const result = await Swal.fire({
      icon: "info",
      title: "Session expired",
      text: "Please login again",
      showConfirmButton: true,
    });

    if (result.isConfirmed) {
      signInUser(setUser, setToken);
    }
  } else {
    await Swal.fire({
      icon: "success",
      title: "Signed out",
      text: "You have been signed out successfully",
      timer: 3000,
      showConfirmButton: false,
      timerProgressBar: true,
    });
  }
}
