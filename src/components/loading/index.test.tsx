import { screen } from "@testing-library/react";
import { renderWithProviders } from "utils/renderWithProviders";
import Loading from ".";

function checkProgressbar() {
  const loadingElement = screen.getByRole("progressbar");
  expect(loadingElement).toBeInTheDocument();
}

describe("Loading Component - with small size", () => {
  const defaultProps = {
    isSmallLoading: true,
  };

  beforeEach(() => {
    renderWithProviders(<Loading {...defaultProps} />);
  });

  test("Renders Loading with default props", () => {
    checkProgressbar();
  });
});

describe("Loading Component - with default props", () => {
  const defaultProps = {
    isSmallLoading: false,
    style: { color: "red" },
  };

  beforeEach(() => {
    renderWithProviders(<Loading {...defaultProps} />);
  });

  test("Renders Loading with default props", () => {
    checkProgressbar();
  });

  test("Renders Loading with dynamic style color", () => {
    const circularProgress = screen.getByRole("progressbar");
    expect(circularProgress).toHaveStyle({ color: "red" });
  });
});
