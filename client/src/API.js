const API_URL = import.meta.env.VITE_API_URL;

// Fetch all users (ADMIN only)
export async function fetchUsers() {
  try {
    const res = await fetch(`${API_URL}/users`);

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error.message);
    }

    return await res.json();
  } catch (err) {
    throw new Error(err.message);
  }
}

// Register new user
export async function registerUser(user) {
  try {
    const res = await fetch(`${API_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error.message);
    }

    return await res.json();
  } catch (err) {
    throw new Error(err.message);
  }
}

// Login user
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
      const error = await res.json().catch(() => ({}));
      throw new Error(error.message);
    }

    return await res.json();
  } catch (err) {
    throw new Error(err.message);
  }
}

// Edit user by ID (SELF or ADMIN only)
export async function patchUserByID(id, updates) {
  try {
    const res = await fetch(`${API_URL}/users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      body: JSON.stringify(updates),
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error.message);
    }

    return await res.json();
  } catch (err) {
    throw new Error(err.message);
  }
}

// Fetch all events
export async function fetchEvents() {
  try {
    const res = await fetch(`${API_URL}/events`);

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error.message);
    }

    return await res.json();
  } catch (err) {
    throw new Error(err.message);
  }
}

// Fetch single event by ID
export async function fetchEventByID(id) {
  try {
    const res = await fetch(`${API_URL}/events/${id}`);

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error.message);
    }

    return await res.json();
  } catch (err) {
    throw new Error(err.message);
  }
}

// Register user to event
export async function registerUserToEvent(eventID) {
  try {
    const res = await fetch(`${API_URL}/events/${eventID}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error.message);
    }

    return await res.json();
  } catch (err) {
    throw new Error(err.message);
  }
}
