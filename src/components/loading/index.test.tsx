import { screen } from "@testing-library/react";
import { renderWithProviders } from "utils/RenderWithProviders";
import Loading from ".";

describe("Loading Component - with small size", () => {
  const defaultProps = {
    isSmallLoading: true,
  };

  beforeEach(() => {
    renderWithProviders(<Loading {...defaultProps} />);
  });

  test("Renders Loading with small size", () => {
    const smallLoading = screen.getByTestId("small-loading");
    expect(smallLoading).toBeInTheDocument();
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
    const loadingImage = screen.getByAltText("loading");
    expect(loadingImage).toBeInTheDocument();
  });
});
