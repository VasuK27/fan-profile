import { lazy } from "react";
import { driverRoute } from "./RoutesEndPoint";

const Driver = lazy(() => import("views/driver"));

export const protectedRoute = [
  {
    to: driverRoute.DRIVER,
    Component: Driver,
  },
];
