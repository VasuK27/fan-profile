import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../../utils/renderWithProviders";
import Sidebar from ".";
import { useNavigate } from "react-router-dom";
import { setCurrentUser } from "utils/SetCurrentUser";
import { DRIVERS } from "constant/TitleText";

// Mock useNavigate
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

jest.mock("utils/SetCurrentUser", () => ({
  setCurrentUser: jest.fn(),
}));

describe("Sidebar component", () => {
  const defaultProps = { open: true };
  const mockNavigate = jest.fn();

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    renderWithProviders(<Sidebar {...defaultProps} />);
  });

  test("renders all sidebar menu items", () => {
    const menuText = screen.getByText(DRIVERS);
    expect(menuText).toBeInTheDocument();

    const menuIcon = screen.getByTestId("DriveEtaIcon");
    expect(menuIcon).toBeInTheDocument();
  });

  test("renders logout button", () => {
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  test("handles logout button click", async () => {
    const logoutButton = screen.getByText("Logout");
    userEvent.click(logoutButton);
    expect(setCurrentUser).toHaveBeenCalledWith(null);
    expect(mockNavigate).toHaveBeenCalledWith("/");
    expect(logoutButton).toBeInTheDocument();
  });
});
