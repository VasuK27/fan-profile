import { lazy } from "react";
import { loginRoute } from "./RoutesEndPoint";

const home = lazy(() => import("views/authentication/login"));

export const publicRoute = [
  {
    to: loginRoute.LOGIN_ROUTE,
    Component: home,
  },
];
