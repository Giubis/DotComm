import { editUser } from "./";
import { getUsers } from "../../API";
import Swal from "sweetalert2";

export async function findUser() {
  try {
    const { users } = await getUsers();

    if (!Array.isArray(users) || users.length === 0) {
      return Swal.fire({
        icon: "info",
        title: "Users",
        html: "<p>No users found</p>",
        confirmButtonText: "OK",
      });
    }

    // Funzione che genera l’elenco
    const renderList = (list) => `
      <ul style="list-style:none; padding:0; text-align:left; max-height:300px; overflow:auto;">
        ${list
          .map(
            (u) => `
            <li 
              class="user-item" 
              data-id="${u._id}" 
              style="margin-bottom:10px; cursor:pointer; padding:5px; border-radius:6px;"
              onmouseover="this.style.background='#f0f0f0'"
              onmouseout="this.style.background='transparent'"
            >
              <strong>${u.name}</strong> 
              <small>(${u.username})</small><br/>
              <small>ID: ${u._id}</small>
            </li>
            <hr/>
          `
          )
          .join("")}
      </ul>
    `;

    // Mostra SweetAlert
    await Swal.fire({
      title: "Find User",
      html: `
        <input 
          id="user-search" 
          class="swal2-input" 
          placeholder="Search by name or username" 
          style="margin-bottom:15px;"
        />
        <div id="user-results">
          ${renderList(users)}
        </div>
      `,
      showConfirmButton: true,
      confirmButtonText: "Close",

      didOpen: () => {
        const input = document.getElementById("user-search");
        const results = document.getElementById("user-results");

        // 🔍 Ricerca live
        input.addEventListener("input", (e) => {
          const q = e.target.value.toLowerCase().trim();
          const filtered = users.filter(
            (u) =>
              u.name.toLowerCase().includes(q) ||
              u.username.toLowerCase().includes(q)
          );
          results.innerHTML = filtered.length
            ? renderList(filtered)
            : "<p>No matching users</p>";
        });

        // 🖱️ Listener per click su user
        results.addEventListener("click", (e) => {
          const item = e.target.closest(".user-item");
          if (item) {
            const userId = item.getAttribute("data-id");
            const user = users.find((u) => u._id === userId);
            if (user) showUserDetails(user);
          }
        });
      },
    });
  } catch (err) {
    console.error(err);
    Swal.fire("Error", err.message || "Failed to load users", "error");
  }
}

// 🔹 Mostra i dettagli di un utente in un nuovo popup
async function showUserDetails(user) {
  const result = await Swal.fire({
    title: user.name,
    html: `
      <p><strong>Username:</strong> ${user.username}</p>
      <p><strong>Email:</strong> ${user.email || "N/A"}</p>
      <p><strong>Phone:</strong> ${user.phone || "N/A"}</p>
      <p><strong>Role:</strong> ${user.role || "user"}</p>
      <p><strong>Bio:</strong> ${user.bio || "No bio"}</p>
    `,
    showConfirmButton: true,
    showCancelButton: true,
    confirmButtonText: "Edit",
    cancelButtonText: "Cancel",
  });

  // ✅ aspetta la risposta e controlla se l’utente ha cliccato "Edit"
  if (result.isConfirmed) {
    console.log(user._id);
    editUser(user._id);
  }
}
