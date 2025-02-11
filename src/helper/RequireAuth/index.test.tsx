import { screen } from "@testing-library/react";
import * as GetCurrentUser from "utils/GetCurrentUser";
import { renderWithProviders } from "utils/RenderWithProviders";
import RequireAuth from ".";

jest.mock("utils/GetCurrentUser");

describe("RequireAuth Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should render the Outlet when the user is authenticated", () => {
    jest
      .spyOn(GetCurrentUser, "getCurrentUser")
      .mockReturnValue({ username: "testUser" });

    renderWithProviders(<RequireAuth />);
    expect(
      screen.queryByText("You do not have access to the requested page.")
    ).not.toBeInTheDocument();
  });

  test("should render the Unauthorized component when the user is not authenticated", () => {
    jest.spyOn(GetCurrentUser, "getCurrentUser").mockReturnValue(null);

    renderWithProviders(<RequireAuth />);
    expect(
      screen.getByText("You do not have access to the requested page.")
    ).toBeInTheDocument();
  });
});
