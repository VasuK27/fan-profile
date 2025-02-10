import { render, screen } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";
describe("App component", () => {
  test("renders Login page on /login route", () => {
    render(<App />);
    setTimeout(() => {
      const loginLink = screen.getByRole("link", { name: /Login/i });
      expect(loginLink).toBeInTheDocument();
      userEvent.click(loginLink);
      expect(screen.getByText("Login")).toBeInTheDocument();
    }, 10);
  });
});
