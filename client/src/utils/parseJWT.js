import { jwtDecode } from "jwt-decode";

export function parseJWT(token) {
  if (!token) {
    return { role: null, expiry: null };
  }

  try {
    const decoded = jwtDecode(token);

    const expiryDate = decoded.exp || null;

    return {
      role: decoded.role || null,
      expiry: expiryDate,
    };
  } catch (err) {
    throw new Error(err.message);
  }
}
