import Swal from "sweetalert2";

export function showMyEvents(myEvents) {
  Swal.fire({
    icon: "info",
    title: "My Events",
    html: myEvents.length
      ? `<ul style="list-style:none; padding:0;">${myEvents
          .map(
            ({ event }) =>
              `<li><strong>${event.title}</strong><br /><small>${new Date(
                event.date
              ).toLocaleString()}</small></li><hr />`
          )
          .join("")}</ul>`
      : "<p>You haven’t joined any events yet</p>",
    showConfirmButton: true,
  });
}
