import Swal from "sweetalert2";

export function logout(setUser, sessionExpired = false) {
  sessionStorage.clear();

  if (setUser) setUser(null);

  if (sessionExpired) {
    Swal.fire({
      icon: "info",
      title: "Session expired",
      text: "Please login again",
      timer: 3000,
      showConfirmButton: false,
    });
  } else {
    Swal.fire({
      icon: "success",
      title: "Logged out",
      text: "You have been logged out successfully",
      timer: 3000,
      showConfirmButton: false,
    });
  }
}
