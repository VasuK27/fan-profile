import Unauthorized from "./index";
import { fireEvent, screen } from "@testing-library/react";
import {
  BACK_TO_LOGIN,
  UNAUTHORIZED,
  UNAUTHORIZED_TEXT,
} from "constant/TitleText";
import { loginRoute } from "constant/RoutesEndPoint";
import { renderWithProviders } from "utils/RenderWithProviders";

describe("Unauthorized Component", () => {
  beforeEach(() => {
    renderWithProviders(<Unauthorized />);
  });
  test("should render the Unauthorized error message and description", () => {
    expect(screen.getByText(UNAUTHORIZED)).toBeInTheDocument();
    expect(screen.getByText(UNAUTHORIZED_TEXT)).toBeInTheDocument();
  });
  test("should call navigate function when back to login button is clicked", () => {
    const signInLink = screen.getByRole("button", { name: BACK_TO_LOGIN });
    fireEvent.click(signInLink);
    const receivedPath = new URL(window.location.href).pathname;
    expect(receivedPath).toBe(loginRoute.LOGIN_ROUTE);
  });
});
