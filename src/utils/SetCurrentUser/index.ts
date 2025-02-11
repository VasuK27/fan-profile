import Cookies from "js-cookie";

export const setCurrentUser = (user: object | null) => {
  if (user) {
    Cookies.set("current_user", JSON.stringify(user));
  } else {
    Cookies.remove("current_user");
  }
};
