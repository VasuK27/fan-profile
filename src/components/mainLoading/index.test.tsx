import { screen } from "@testing-library/react";
import { renderWithProviders } from "utils/renderWithProviders";
import MainLoading from ".";

function getLoadingImage() {
  const loadingImage = screen.getByAltText("loading");
  expect(loadingImage).toBeInTheDocument();
}

describe("MainLoading Component - with small size", () => {
  const defaultProps = {
    isSmallLoading: true,
  };

  beforeEach(() => {
    renderWithProviders(<MainLoading {...defaultProps} />);
  });

  test("Renders MainLoading with small size", () => {
    const smallLoadingBox = screen.getByTestId("small-loading");
    expect(smallLoadingBox).toBeInTheDocument();
  });
});

describe("MainLoading Component - with default props", () => {
  const defaultProps = {
    isSmallLoading: false,
  };

  beforeEach(() => {
    renderWithProviders(<MainLoading {...defaultProps} />);
  });

  test("Renders MainLoading with default props", () => {
    getLoadingImage();
  });

  test("Renders MainLoading with dynamic style color", () => {
    const loadingImage = screen.getByAltText("loading");
    expect(loadingImage).toBeInTheDocument();
  });
});
