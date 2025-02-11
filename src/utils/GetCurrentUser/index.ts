import Cookies from "js-cookie";

export const getCurrentUser = () => {
  let user = null;
  try {
    user =
      Cookies.get("current_user") != null
        ? JSON.parse(Cookies.get("current_user") ?? "")
        : null;
  } catch (error) {
    user = null;
  }
  return user;
};
