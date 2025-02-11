import { screen } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { renderWithProviders } from ".";
import { Box } from "@mui/material";

const TestComponent = () => <Box data-testid="test-element">Hello World</Box>;

describe("renderWithProviders", () => {
  test("renders the component with default store", () => {
    renderWithProviders(<TestComponent />);
    expect(screen.getByTestId("test-element")).toHaveTextContent("Hello World");
  });

  test("renders the component with a custom store", () => {
    const customStore = configureStore({ reducer: {} });
    renderWithProviders(<TestComponent />, { customStore });
    expect(screen.getByTestId("test-element")).toBeInTheDocument();
  });

  test("renders within MemoryRouter context", () => {
    renderWithProviders(<TestComponent />);
    expect(screen.getByTestId("test-element")).toBeInTheDocument();
  });
});
