import { logout } from "../users/logout";
import { parseJWT } from "../misc/parseJWT";

export function startSessionTimer(setUser, token) {
  const { expiry } = parseJWT(token) || {};

  if (!expiry) {
    logout(setUser, null, true);
    return;
  }

  const checkExpiry = () => {
    const now = Math.floor(new Date().getTime() / 1000);

    if (now >= expiry) {
      logout(setUser, null, true);
      return;
    }

    setTimeout(checkExpiry, 1000);
  };

  checkExpiry();
}
