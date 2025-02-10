import { loginRoute } from "./RoutesEndPoint";
import Login from "views/authentication/login";

export const publicRoute = [
  {
    to: loginRoute.LOGIN_ROUTE,
    Component: Login,
  },
];
