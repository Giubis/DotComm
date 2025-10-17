import { loginUser } from "../../API";
import { signUpUser } from ".";
import { startSessionTimer } from "../session/startSessionTimer";
import Swal from "sweetalert2";

export async function signInUser(setUser, setToken) {
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

  try {
    Swal.fire({
      title: "Signin in...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
      showConfirmButton: false,
    });

    const result = await loginUser(formValues.email, formValues.password);

    sessionStorage.setItem("user", JSON.stringify(result.user));
    sessionStorage.setItem("token", result.token);

    if (setUser) setUser(result.user);
    if (setToken) setToken(result.token);

    Swal.close();

    Swal.fire({
      icon: "success",
      title: "Welcome back!",
      text: `Logged in as ${result.user.username}`,
      timer: 3000,
      showConfirmButton: false,
      timerProgressBar: true,
    });

    startSessionTimer(setUser, result.token);
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
      signUpUser(formValues.email, formValues.password, setUser);
    }
  }
}
