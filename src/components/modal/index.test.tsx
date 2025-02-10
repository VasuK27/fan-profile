import { screen } from "@testing-library/react";
import Modal from ".";
import { renderWithProviders } from "utils/RenderWithProviders";

const handleCloseMock = jest.fn();

function getButtonIcon(): HTMLElement {
  return screen.getByRole("button");
}

const defaultProps = {
  open: true,
  label: "Test Modal",
  handleClose: () => {},
  icon: true,
  children: <div>Child Content</div>,
};

describe("Modal Component - with true props value", () => {
  beforeEach(() => {
    renderWithProviders(<Modal {...defaultProps} />);
  });

  test("displays the label correctly", () => {
    expect(screen.getByText("Test Modal")).toBeInTheDocument();
  });

  test("renders close icon when icon prop is true", () => {
    expect(getButtonIcon()).toBeInTheDocument();
  });

  test("renders children correctly", () => {
    expect(screen.getByText("Child Content")).toBeInTheDocument();
  });
});

describe("Modal Component - with icon false", () => {
  beforeEach(() => {
    renderWithProviders(
      <Modal {...defaultProps} handleClose={handleCloseMock} icon={false} />
    );
  });

  test("does not render close icon when icon prop is false", () => {
    expect(screen.queryByRole("button")).toBeNull();
  });
});

describe("Modal Component - with open false", () => {
  beforeEach(() => {
    renderWithProviders(<Modal {...defaultProps} open={false} />);
  });

  test("does not render modal when open is false", () => {
    expect(screen.queryByText("Test Modal")).not.toBeInTheDocument();
  });
});
