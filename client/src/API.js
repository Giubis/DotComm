const API_URL = import.meta.env.VITE_API_URL;

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

export async function fetchUsers() {
  const res = await fetch(`${API_URL}/users`);

  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
}

export async function loginUser(email, password) {
  try {
    const res = await fetch(`${API_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message);
    }

    return await res.json();
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function registerUser(newUser) {
  try {
    const res = await fetch(`${API_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message);
    }

    return await res.json();
  } catch (err) {
    throw new Error(err.message);
  }
}
