import Loading from "components/loading";
import { protectedRoute } from "constant/ProtectedRoute";
import { publicRoute } from "constant/PublicRoute";
import { loginRoute } from "constant/RoutesEndPoint";
import CheckAuth from "helper/CheckAuth";
import RequireAuth from "helper/RequireAuth";
import Layout from "layout";
import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

const NotFoundPage = lazy(() => import("layout/notFoundPage"));

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading height="100vh" />}>
        <Routes>
          <Route element={<CheckAuth />}>
            {publicRoute?.map(({ to, Component }) => (
              <Route key={to}>
                <Route path={to} element={<Component />} />
              </Route>
            ))}
          </Route>
          <Route element={<Layout />}>
            {protectedRoute.map(({ to, Component }) => {
              return (
                <Route key={to} element={<RequireAuth />}>
                  <Route path={to} element={<Component />} />
                </Route>
              );
            })}
          </Route>
          <Route
            path="*"
            element={<Navigate to={loginRoute.PAGE_NOT_FOUND_ROUTE} />}
          />
          <Route
            path={loginRoute.PAGE_NOT_FOUND_ROUTE}
            element={<NotFoundPage />}
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
