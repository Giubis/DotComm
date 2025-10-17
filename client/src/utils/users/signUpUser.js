import { createUser } from "../../API";
import { startSessionTimer } from "../session/startSessionTimer";
import Swal from "sweetalert2";
import { validateEmail, validatePassword, validateURL } from "../misc";

export async function signUpUser(
  prefilledEmail,
  prefilledPassword,
  setUser,
  setToken
) {
  const { value: formValues } = await Swal.fire({
    title: "Sign up",
    html: `
      <input id="swal-email" class="swal2-input" placeholder="Email" value="${prefilledEmail}">
      <input id="swal-password" type="password" class="swal2-input" placeholder="Password" value="${prefilledPassword}">
      <input id="swal-name" class="swal2-input" placeholder="Name">
      <input id="swal-username" class="swal2-input" placeholder="Username">
      <input id="swal-avatar" class="swal2-input" placeholder="Avatar URL">
      <input id="swal-birthday" type="date" class="swal2-input" placeholder="Birthday">
      <input id="swal-phone" class="swal2-input" placeholder="Phone">
      <textarea id="swal-bio" class="swal2-textarea" placeholder="Bio"></textarea>
    `,
    focusConfirm: false,
    confirmButtonText: "Register",
    preConfirm: () => {
      const email = document.getElementById("swal-email").value;
      const password = document.getElementById("swal-password").value;
      const name = document.getElementById("swal-name").value;
      const username = document.getElementById("swal-username").value;
      const avatar = document.getElementById("swal-avatar").value;
      const birthday = document.getElementById("swal-birthday").value;
      const phone = document.getElementById("swal-phone").value;
      const bio = document.getElementById("swal-bio").value;

      if (!name || !username || !email || !password) {
        Swal.showValidationMessage(
          "Name, Username, Email, and Password are mandatory"
        );
        return false;
      }

      if (!validateEmail(email)) {
        Swal.showValidationMessage("Please enter a valid email address");
        return false;
      }

      if (!validatePassword(password)) {
        Swal.showValidationMessage(
          "Password must be at least 8 characters, include uppercase, lowercase, number, and symbol"
        );
        return false;
      }

      if (avatar && !validateURL(avatar)) {
        Swal.showValidationMessage("Please enter a valid URL for the avatar");
        return false;
      }

      return { name, username, email, password, avatar, birthday, phone, bio };
    },
  });

  if (!formValues) return;

  try {
    Swal.fire({
      title: "Signing up...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    const result = await createUser(formValues);

    sessionStorage.setItem("user", JSON.stringify(result.user));
    sessionStorage.setItem("token", result.token);

    if (setUser) {
      setUser(result.user);
    }

    if (setToken) {
      setToken(result.token);
    }

    Swal.fire({
      icon: "success",
      title: "Success!",
      text: `User ${result.user.username} registered`,
    });

    startSessionTimer(setUser, result.token);
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Error!",
      text: err.message,
    });
  }
}
