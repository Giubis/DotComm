const API_URL = import.meta.env.VITE_API_URL;

export async function fetchUsers() {
  const res = await fetch(`${API_URL}/users`);

  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
}

export async function fetchEvents() {
  const res = await fetch(`${API_URL}/events`);

  if (!res.ok) throw new Error("Failed to fetch events");
  return res.json();
}

export async function fetchEvent(id) {
  const res = await fetch(`${API_URL}/events/${id}`);

  if (!res.ok) throw new Error(`Failed to fetch event with ID ${id}`);
  return res.json();
}
