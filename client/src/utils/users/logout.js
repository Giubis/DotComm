import { login } from "./login";
import Swal from "sweetalert2";

export async function logout(setUser, setToken, sessionExpired = false) {
  if (Swal.isVisible()) {
    await Promise.resolve().then(Swal.close());
  }

  if (setUser) setUser(null);

  if (setToken) setToken(null);

  sessionStorage.clear();

  if (sessionExpired) {
    const result = await Swal.fire({
      icon: "info",
      title: "Session expired",
      text: "Please login again",
      showConfirmButton: true,
    });

    if (result.isConfirmed) {
      login(setUser, setToken);
    }
  } else {
    await Swal.fire({
      icon: "success",
      title: "Logged out",
      text: "You have been logged out successfully",
      timer: 3000,
      showConfirmButton: false,
    });
  }
}
