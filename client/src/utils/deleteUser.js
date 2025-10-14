import { deleteAccountByID } from "../API";
import Swal from "sweetalert2";

export async function deleteUser(id, setUser) {
  const result = await Swal.fire({
    icon: "warning",
    title: "Are you sure?",
    text: "This action cannot be undone!",
    confirmButtonText: "Yes, delete my account",
    showCancelButton: true,
    reverseButtons: true,
    customClass: {
      popup: "shake",
    },
  });

  if (result.isDismissed) {
    Swal.fire({
      icon: "info",
      title: "Aborted",
      text: "Thanks for staying with us!",
      timer: 3000,
      showConfirmButton: false,
    });
    return;
  }

  try {
    Swal.fire({
      title: "Deleting...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    await deleteAccountByID(id);

    Swal.close();

    await Swal.fire({
      icon: "success",
      title: "Account deleted",
      text: "Your account has been successfully deleted",
      timer: 3000,
      showConfirmButton: false,
    });

    sessionStorage.clear();
    setUser(null);

    window.location.href = "/";
  } catch (err) {
    Swal.close();
    Swal.fire({
      icon: "error",
      title: "Error",
      text: err.message,
    });
  }
}
