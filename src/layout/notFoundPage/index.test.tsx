import { screen, fireEvent } from "@testing-library/react";
import { getCurrentUser } from "utils/GetCurrentUser";
import { driverRoute, loginRoute } from "constant/RoutesEndPoint";
import NotFoundPage from ".";
import { renderWithProviders } from "utils/RenderWithProviders";

jest.mock("utils/GetCurrentUser", () => ({
  getCurrentUser: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

const mockNavigate = jest.fn();

describe("NotFoundPage Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    require("react-router-dom").useNavigate.mockReturnValue(mockNavigate);
  });

  test("should render NotFoundPage with correct text", () => {
    renderWithProviders(<NotFoundPage />);
    expect(screen.getByText(/404/i)).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  test("should navigate to driver route if token exists", () => {
    (getCurrentUser as jest.Mock).mockReturnValue({ token: "mockToken" });
    renderWithProviders(<NotFoundPage />);

    fireEvent.click(screen.getByRole("button"));

    expect(mockNavigate).toHaveBeenCalledWith(driverRoute.DRIVER);
  });

  test("should navigate to login route if no token exists", () => {
    (getCurrentUser as jest.Mock).mockReturnValue(null);
    renderWithProviders(<NotFoundPage />);
    fireEvent.click(screen.getByRole("button"));

    expect(mockNavigate).toHaveBeenCalledWith(loginRoute.LOGIN_ROUTE);
  });
});
