import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { getCurrentUser } from "utils/GetCurrentUser";
import CheckAuth from ".";
import { driverRoute } from "constant/RoutesEndPoint";

jest.mock("utils/GetCurrentUser");

describe("CheckAuth Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should render Outlet when user is not logged in", () => {
    (getCurrentUser as jest.Mock).mockReturnValue(null);

    render(
      <MemoryRouter>
        <Routes>
          <Route element={<CheckAuth />}>
            <Route path="/" element={<div>Guest Route</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Guest Route")).toBeInTheDocument();
  });

  test("should use <Outlet /> when user is not authenticated", () => {
    (getCurrentUser as jest.Mock).mockReturnValue(null);

    render(
      <MemoryRouter>
        <Routes>
          <Route element={<CheckAuth />}>
            <Route path="/" element={<div>Public Route</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Public Route")).toBeInTheDocument();
  });

  test("should handle case where getCurrentUser() returns undefined", () => {
    (getCurrentUser as jest.Mock).mockReturnValue(undefined);

    render(
      <MemoryRouter>
        <Routes>
          <Route element={<CheckAuth />}>
            <Route path="/" element={<div>Public Route</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Public Route")).toBeInTheDocument();
  });
});

test("should navigate to driver route when user is logged in", () => {
  (getCurrentUser as jest.Mock).mockReturnValue({ username: "testUser" });

  render(
    <MemoryRouter initialEntries={["/"]}>
      <Routes>
        <Route element={<CheckAuth />}>
          <Route path="/" element={<div>Public Route</div>} />
        </Route>
        <Route
          path={driverRoute.DRIVER}
          element={<div>Driver Dashboard</div>}
        />
      </Routes>
    </MemoryRouter>
  );

  expect(screen.queryByText("Public Route")).not.toBeInTheDocument();

  expect(screen.getByText("Driver Dashboard")).toBeInTheDocument();
});
