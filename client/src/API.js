const API_URL = import.meta.env.VITE_API_URL;
const token = sessionStorage.getItem("token");

// Fetch all users (ADMIN only)
export async function getUsers() {
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

// Fetch user by ID (ADMIN only)
export async function getUserByID(id) {
  try {
    const res = await fetch(`${API_URL}/users/${id}`);

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error.message);
    }

    return await res.json();
  } catch (err) {
    throw new Error(err.message);
  }
}

// Register new staff member
export async function createAdmin(user) {
  try {
    const res = await fetch(`${API_URL}/users/`, {
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

// Register new user
export async function createUser(user) {
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
        Authorization: `Bearer ${token}`,
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

// Delete account by ID
export async function deleteUserByID(id) {
  try {
    const res = await fetch(`${API_URL}/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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

// Fetch all events
export async function getEvents() {
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
export async function getEventByID(id) {
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

// Create new event (ADMIN only)
export async function createEvent(event) {
  try {
    const res = await fetch(`${API_URL}/events`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(event),
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

// Edit event by ID (ADMIN only)
export async function patchEventByID(id, updates) {
  try {
    const res = await fetch(`${API_URL}/users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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

// Register user to event
export async function registerUserToEvent(eventID) {
  try {
    const res = await fetch(`${API_URL}/events/${eventID}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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
