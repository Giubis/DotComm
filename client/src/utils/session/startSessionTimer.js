import { signOutUser } from "../users/signOutUser";
import { parseJWT } from "../misc/parseJWT";

export function startSessionTimer(setUser, token) {
  const { expiry } = parseJWT(token) || {};

  if (!expiry) {
    signOutUser(setUser, null, true);
    return;
  }

  const checkExpiry = () => {
    const now = Math.floor(new Date().getTime() / 1000);

    if (now >= expiry) {
      signOutUser(setUser, null, true);
      return;
    }

    setTimeout(checkExpiry, 1000);
  };

  checkExpiry();
}
