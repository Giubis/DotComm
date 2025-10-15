import { getUserByID, patchUserByID } from "../../API";
import Swal from "sweetalert2";

export async function editUser(id) {
  let user;

  try {
    ({ user } = await getUserByID(id));
  } catch (err) {
    console.error(err.message);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: err.message || "Failed to fetch user",
    });
    return;
  }

  const { value: formValues } = await Swal.fire({
    title: "Edit User",
    html: `
      <input id="swal-email" class="swal2-input" placeholder="Email" value="${
        user.email || ""
      }">
      <input id="swal-password" type="password" class="swal2-input" placeholder="New password (optional)">
      <input id="swal-name" class="swal2-input" placeholder="Name" value="${
        user.name || ""
      }">
      <input id="swal-username" class="swal2-input" placeholder="Username" value="${
        user.username || ""
      }">
      <select id="swal-role" class="swal2-select">
      <option value="user" ${
        user.role === "user" ? "selected" : ""
      }>User</option>
      <option value="admin" ${
        user.role === "admin" ? "selected" : ""
      }>Admin</option>
      </select>
      <input id="swal-avatar" class="swal2-input" placeholder="Avatar URL" value="${
        user.avatar || ""
      }">
      <input id="swal-birthday" type="date" class="swal2-input" placeholder="Birthday" value="${
        user.birthday ? new Date(user.birthday).toISOString().split("T")[0] : ""
      }">
      <input id="swal-phone" class="swal2-input" placeholder="Phone" value="${
        user.phone || ""
      }">
      <textarea id="swal-bio" class="swal2-textarea" placeholder="Bio">${
        user.bio || ""
      }</textarea>
    `,
    focusConfirm: false,
    confirmButtonText: "Save",
    showCancelButton: true,
    cancelButtonText: "Cancel",
    preConfirm: () => {
      const email = document.getElementById("swal-email").value;
      const password = document.getElementById("swal-password").value;
      const name = document.getElementById("swal-name").value;
      const username = document.getElementById("swal-username").value;
      const role = document.getElementById("swal-role").value;
      const avatar = document.getElementById("swal-avatar").value;
      const birthday = document.getElementById("swal-birthday").value;
      const phone = document.getElementById("swal-phone").value;
      const bio = document.getElementById("swal-bio").value;

      const updates = {
        email,
        name,
        username,
        role,
        avatar,
        birthday,
        phone,
        bio,
      };
      if (password) updates.password = password;

      return updates;
    },
  });

  if (formValues) {
    try {
      await patchUserByID(id, formValues);

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Profile updated successfully",
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.message || "Failed to update user",
      });
    }
  }
}
