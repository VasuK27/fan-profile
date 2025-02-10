import { screen } from "@testing-library/react";
import { renderWithProviders } from "utils/RenderWithProviders";
import Button from ".";
import { CustomButtonProps } from "interfaces/custom";
import { WIKIPEDIA_PROFILE } from "constant/TitleText";

describe("Button component in true value props", () => {
  const defaultProps: CustomButtonProps = {
    label: WIKIPEDIA_PROFILE,
    loading: true,
    disabled: true,
    fullWidth: false,
    type: "button",
  };

  beforeEach(() => {
    renderWithProviders(<Button {...defaultProps} />);
  });

  test("renders with default props", () => {
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  test("render header - title text of details", async () => {
    const labelText = screen.getByText(WIKIPEDIA_PROFILE);
    expect(labelText).toBeInTheDocument();
  });

  test("renders with loading when loading is true", () => {
    const loadingImage = screen.getByAltText("loading");
    expect(loadingImage).toBeInTheDocument();
  });

  test("button is disabled when loading is true", () => {
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });

  test("does not render full-width button when fullWidth is false", () => {
    const button = screen.getByRole("button");
    expect(button).not.toHaveClass("MuiButton-fullWidth");
  });
});

describe("Button component in disable and loading props", () => {
  test("button is disabled when loading is false and disabled is true", () => {
    renderWithProviders(<Button loading={false} disabled />);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });

  test("button is disabled when loading is true and disabled is false", () => {
    renderWithProviders(<Button loading disabled={false} />);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });
});
