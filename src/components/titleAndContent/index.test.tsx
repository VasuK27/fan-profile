import { screen } from "@testing-library/react";
import { renderWithProviders } from "utils/RenderWithProviders";
import TitleAndContent from ".";

describe("TitleAndContent Component", () => {
  const defaultProps = {
    title: "Test Title",
    content: "Test Content",
  };

  beforeEach(() => {
    renderWithProviders(<TitleAndContent {...defaultProps} />);
  });

  test("render the title and content", () => {
    const title = "Test Title";
    const content = "Test Content";
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(content)).toBeInTheDocument();
  });
});
