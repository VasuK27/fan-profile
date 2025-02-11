import { screen } from "@testing-library/react";
import * as GetCurrentUser from "utils/GetCurrentUser";
import RequireAuth from ".";
import { renderWithProviders } from "utils/RenderWithProviders";

jest.mock("utils/GetCurrentUser");

jest.mock("layout/unauthorized", () => {
  const MockUnauthorized = () => <div>Unauthorized Page</div>;
  MockUnauthorized.displayName = "MockUnauthorized";
  return MockUnauthorized;
});

describe("RequireAuth Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should render the Outlet when the user is authenticated", () => {
    jest
      .spyOn(GetCurrentUser, "getCurrentUser")
      .mockReturnValue({ username: "testUser" });

    renderWithProviders(<RequireAuth />);
    expect(screen.queryByText("Unauthorized Page")).not.toBeInTheDocument();
  });

  test("should render the Unauthorized component when the user is not authenticated", () => {
    jest.spyOn(GetCurrentUser, "getCurrentUser").mockReturnValue(null);

    renderWithProviders(<RequireAuth />);
    expect(screen.getByText("Unauthorized Page")).toBeInTheDocument();
  });
});
