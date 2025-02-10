import { screen } from "@testing-library/react";
import { renderWithProviders } from "utils/RenderWithProviders";
import Header from ".";
import { getCurrentUser } from "utils/GetCurrentUser";

jest.mock("utils/GetCurrentUser", () => ({
  getCurrentUser: jest.fn(),
}));

describe("Header component", () => {
  const mockUser = {
    username: "JohnDoe",
    email: "johndoe@example.com",
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (getCurrentUser as jest.Mock).mockReturnValue(mockUser);
    renderWithProviders(<Header />);
  });

  test("renders menu icon", () => {
    expect(screen.getByLabelText("toggle drawer")).toBeInTheDocument();
  });

  test("renders user avatar with correct initial", () => {
    const avatar = screen.getByText(mockUser.username[0].toUpperCase());
    expect(avatar).toBeInTheDocument();
  });

  test("displays the correct user information", () => {
    expect(screen.getByText(mockUser.username)).toBeInTheDocument();
    expect(screen.getByText(mockUser.email)).toBeInTheDocument();
  });

  test("renders main content area", () => {
    expect(screen.getByRole("main")).toBeInTheDocument();
  });
});
