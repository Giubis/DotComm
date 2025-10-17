import { jwtDecode } from "jwt-decode";

export function parseJWT(token) {
  if (!token) {
    return { id: null, role: null, expiry: null };
  }

  try {
    const decoded = jwtDecode(token);

    return {
      id: decoded.id || null,
      role: decoded.role || null,
      expiry: decoded.exp || null,
    };
  } catch (err) {
    throw new Error(err.message);
  }
}
