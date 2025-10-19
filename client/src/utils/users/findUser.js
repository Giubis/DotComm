import { deleteUser, editUser } from "../users";
import { getUsers } from "../../API";
import { unjoinEvent } from "../events";
import Swal from "sweetalert2";

export async function findUser(id, events) {
  try {
    Swal.fire({
      title: "Getting users...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
      showConfirmButton: false,
    });

    const { users } = await getUsers();
    const otherUsers = users.filter((loggedUser) => loggedUser._id !== id);

    if (!Array.isArray(otherUsers) || otherUsers.length === 0) {
      return Swal.fire({
        icon: "info",
        title: "Users",
        html: "<p>No users found</p>",
        showConfirmButton: true,
      });
    }

    const renderList = (list) => `
      <ul style="list-style:none; padding:0; text-align:left; max-height:300px; overflow:auto;">
        ${list
          .map(
            (user) => `
            <li 
              class="user-item" 
              data-id="${user._id}" 
              style="margin-bottom:10px; cursor:pointer; padding:5px; border-radius:6px;"
            >
              <strong>${user.name}</strong> 
              <small>(${user.username})</small><br/>
              <small>ID: ${user._id}</small>
            </li>
            <hr/>
          `
          )
          .join("")}
      </ul>
    `;

    await Swal.fire({
      title: "Find user",
      html: `
        <input 
          id="user-search" 
          class="swal2-input" 
          placeholder="Search by name or username" 
          style="margin-bottom:15px;"
        />
        <div id="user-results">
          ${renderList(otherUsers)}
        </div>
      `,
      showConfirmButton: true,
      confirmButtonText: "Close",

      didOpen: () => {
        const input = document.getElementById("user-search");
        const results = document.getElementById("user-results");

        input.addEventListener("input", (event) => {
          const query = event.target.value.toLowerCase().trim();
          const filtered = otherUsers.filter(
            (user) =>
              user.name.toLowerCase().includes(query) ||
              user.username.toLowerCase().includes(query)
          );
          results.innerHTML = filtered.length
            ? renderList(filtered)
            : "<p>No matching users</p>";
        });

        results.addEventListener("click", (event) => {
          const item = event.target.closest(".user-item");

          if (item) {
            const userID = item.getAttribute("data-id");
            const user = otherUsers.find((user) => user._id === userID);

            if (user) {
              showUserDetails(user, events);
            }
          }
        });
      },
    });
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: err.message,
    });
  }
}

async function showUserDetails(user, events) {
  const userEvents = events.filter((event) => user.events.includes(event._id));

  const result = await Swal.fire({
    title: user.name,
    html: `
      <p><strong>Username:</strong> ${user.username}</p>
      <p><strong>Email:</strong> ${user.email || "N/A"}</p>
      <p><strong>Phone:</strong> ${user.phone || "N/A"}</p>
      <p><strong>Role:</strong> ${user.role || "user"}</p>
      <p><strong>Bio:</strong> ${user.bio || "No bio"}</p>
      <p><strong>Events:</strong>
      <div id="user-events">
        ${
          userEvents && userEvents.length
            ? userEvents
                .map(
                  (event) => `
                  <div style="display:flex; justify-content: space-between; align-items: center;">
                    <small>${event.title}</small>
                    <button 
                      class="unjoin-button" 
                      data-eventid="${event._id}" 
                      style="cursor:pointer; color:red; border:none; background:none;"
                    >
                      REMOVE
                    </button>
                  </div>
                  <hr />
                `
                )
                .join("")
            : "<small>No events</small>"
        }
      </div>
    `,
    showConfirmButton: true,
    showCancelButton: true,
    showDenyButton: true,
    confirmButtonText: "Edit",
    cancelButtonText: "Cancel",
    denyButtonText: "Delete account",
    didOpen: () => {
      const buttons = document.querySelectorAll(".unjoin-button");
      buttons.forEach((button) => {
        button.addEventListener("click", async (event) => {
          const eventID = event.currentTarget.dataset.eventid;

          await unjoinEvent(eventID, user._id);
        });
      });
    },
  });

  if (result.isConfirmed) {
    editUser(user._id);
  }

  if (result.isDenied) {
    deleteUser(user._id);
  }
}
