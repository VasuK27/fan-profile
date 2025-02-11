import { screen } from "@testing-library/react";
import Layout from "layout";
import { getCurrentUser } from "utils/GetCurrentUser";
import { renderWithProviders } from "utils/RenderWithProviders";

// Mock getCurrentUser function
jest.mock("utils/GetCurrentUser", () => ({
  getCurrentUser: jest.fn(),
}));

// Mock Header component
jest.mock("./header", () => {
  const MockHeader = () => <div data-testid="header-component">Header</div>;
  MockHeader.displayName = "MockHeader";
  return MockHeader;
});

describe("Layout Component", () => {
  test("should render Header when user is logged in", () => {
    (getCurrentUser as jest.Mock).mockReturnValue({ username: "testUser" });
    renderWithProviders(<Layout />);
    expect(screen.getByTestId("header-component")).toBeInTheDocument();
  });

  test("should render Outlet when user is not logged in", () => {
    (getCurrentUser as jest.Mock).mockReturnValue(null);
    renderWithProviders(<Layout />);
    expect(screen.queryByTestId("header-component")).not.toBeInTheDocument();
  });
});
