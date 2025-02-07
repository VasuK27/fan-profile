import { fireEvent, screen } from "@testing-library/react";
import { renderWithProviders } from "utils/renderWithProviders";
import Login from ".";
import { TITLE_SUB_TEXT, USER_DETAILS } from "constant/TitleText";
import { SUBMIT } from "constant/ButtonLabel";
import { ENTER_EMAIL } from "constant/Placeholder";
import {
  INVALID_EMAIL,
  REQUIRED_EMAIL,
  REQUIRED_USER_NAME,
} from "constant/ErrorMessages";

describe("Login component - with user details submission", () => {
  beforeEach(() => {
    renderWithProviders(<Login />);
  });

  test("renders titles of form", () => {
    const titleText = screen.getByText(USER_DETAILS);
    const subTitleText = screen.getByText(TITLE_SUB_TEXT);

    expect(titleText).toBeInTheDocument();
    expect(subTitleText).toBeInTheDocument();
  });

  test("renders login form elements", () => {
    expect(
      screen.getByRole("textbox", { name: /user name/i })
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText(ENTER_EMAIL)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: SUBMIT })).toBeInTheDocument();
  });

  test("shows validation errors for invalid input", async () => {
    const submitButton = screen.getByRole("button", { name: /submit/i });
    fireEvent.click(submitButton);

    expect(await screen.findByText(REQUIRED_USER_NAME)).toBeInTheDocument();
    expect(await screen.findByText(REQUIRED_EMAIL)).toBeInTheDocument();
  });

  test("shows validation errors for invalid email address", async () => {
    const emailInput: HTMLInputElement = screen.getByRole("textbox", {
      name: /email/i,
    });
    const submitButton = screen.getByRole("button", { name: /submit/i });

    fireEvent.change(emailInput, { target: { value: "admin.com" } });
    fireEvent.click(submitButton);

    expect(await screen.findByText(INVALID_EMAIL)).toBeInTheDocument();
  });

  test("submit form with valid values", async () => {
    const userNameInput = screen.getByRole("textbox", { name: /user name/i });
    const emailInput = screen.getByPlaceholderText(ENTER_EMAIL);

    fireEvent.change(userNameInput, { target: { value: "Jone" } });
    fireEvent.change(emailInput, { target: { value: "jone@yopmail.com" } });

    const submitButton = screen.getByRole("button", { name: /submit/i });
    fireEvent.click(submitButton);

    expect(userNameInput).toBeInTheDocument();
  });
});
