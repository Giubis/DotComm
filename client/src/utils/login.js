import { loginUser } from "../API";
import { logout } from "../utils/logout";
import { register } from "./register";
import Swal from "sweetalert2";

export async function login(setUser) {
  const { value: formValues } = await Swal.fire({
    title: "Login",
    html: `
      <input id="swal-email" class="swal2-input" placeholder="Email">
      <input id="swal-password" type="password" class="swal2-input" placeholder="Password">
    `,
    focusConfirm: false,
    confirmButtonText: "Login",
    showCancelButton: true,
    cancelButtonText: "Cancel",
    preConfirm: () => {
      const email = document.getElementById("swal-email").value;
      const password = document.getElementById("swal-password").value;

      if (!email || !password) {
        Swal.showValidationMessage("Please enter both email and password");
        return false;
      }
      return { email, password };
    },
  });

  if (!formValues) return;

  Swal.fire({
    title: "Logging in...",
    allowOutsideClick: false,
    didOpen: async () => {
      Swal.showLoading();
      try {
        const result = await loginUser(formValues.email, formValues.password);

        sessionStorage.setItem("user", JSON.stringify(result.user));
        sessionStorage.setItem("token", result.token);

        if (setUser) setUser(result.user);

        Swal.close();
        Swal.fire({
          icon: "success",
          title: "Welcome back!",
          text: `Logged in as ${result.user.username}`,
          timer: 2000,
          showConfirmButton: false,
        });

        setTimeout(() => logout(setUser, true), 60 * 60 * 1000);
      } catch (err) {
        Swal.close();

        const { isConfirmed } = await Swal.fire({
          icon: "error",
          title: "Login failed",
          text: err.message,
          showConfirmButton: true,
          confirmButtonText: "Register instead",
        });

        if (isConfirmed) {
          register(formValues.email, formValues.password, setUser);
        }
      }
    },
    showConfirmButton: false,
  });
}
