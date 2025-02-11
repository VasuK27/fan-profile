import { MemoryRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import { render, RenderOptions } from "@testing-library/react";
import { AllTheProvidersProps } from "interfaces/global";
import { ReactElement } from "react";
import { store } from "redux/store";
import { Provider } from "react-redux";

const AllTheProviders = ({ children, customStore }: AllTheProvidersProps) => {
  return (
    <Provider store={customStore || store}>
      <MemoryRouter>{children}</MemoryRouter>
    </Provider>
  );
};

const renderWithProviders = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper"> & {
    customStore?: ReturnType<typeof configureStore>;
  }
) =>
  render(ui, {
    wrapper: ({ children }) => (
      <AllTheProviders customStore={options?.customStore}>
        {children}
      </AllTheProviders>
    ),
    ...options,
  });

export * from "@testing-library/react";
export { renderWithProviders };
