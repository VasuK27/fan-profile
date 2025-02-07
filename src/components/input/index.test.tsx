import { screen } from "@testing-library/react";
import { renderWithProviders } from "utils/renderWithProviders";
import Input from ".";
import { Formik } from "formik";
import { USER_NAME } from "constant/InputLabel";
import { ENTER_USER_NAME } from "constant/Placeholder";

const defaultProps = {
  name: "username",
  label: USER_NAME,
  type: "text",
  placeholder: ENTER_USER_NAME,
  required: true,
};

describe("Input Component - with formik", () => {
  beforeEach(() => {
    renderWithProviders(
      <Formik initialValues={{ username: "" }} onSubmit={() => {}}>
        <Input {...defaultProps} />
      </Formik>
    );
  });

  test("renders input box with label props", () => {
    expect(
      screen.getByRole("textbox", { name: /user name/i })
    ).toBeInTheDocument();
  });

  test("renders with the correct placeholder", () => {
    expect(screen.getByPlaceholderText(ENTER_USER_NAME)).toBeInTheDocument();
  });

  test("renders with the correct type", () => {
    const inputField = screen.getByLabelText(USER_NAME);
    expect(inputField).toHaveAttribute("type", "text");
  });
});
