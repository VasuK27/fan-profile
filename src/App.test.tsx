import { render, screen } from "@testing-library/react";
import App from "./App";
import { USER_DETAILS } from "constant/TitleText";
describe("App component", () => {
  test("renders Login page on /login route", async () => {
    render(<App />);
    const tileText = await screen.findByText(USER_DETAILS);
    expect(tileText).toBeInTheDocument();
  });
});
