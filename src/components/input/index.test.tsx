import { screen } from "@testing-library/react";
import { renderWithProviders } from "utils/RenderWithProviders";
import Input from ".";
import { Formik } from "formik";
import { USER_NAME } from "constant/InputLabel";
import { ENTER_USER_NAME } from "constant/Placeholder";

const defaultProps = {
  name: "username",
  label: USER_NAME,
  type: "text",
  placeholder: ENTER_USER_NAME,
  required: false,
};

function inputField() {
  expect(
    screen.getByRole("textbox", { name: /user name/i })
  ).toBeInTheDocument();
}

describe("Input Component - with formik", () => {
  beforeEach(() => {
    renderWithProviders(
      <Formik initialValues={{ username: "" }} onSubmit={() => {}}>
        <Input {...defaultProps} />
      </Formik>
    );
  });

  test("renders input box with label props", () => {
    inputField();
    const asterisk = screen.queryByText("*");
    expect(asterisk).not.toBeInTheDocument();
  });

  test("renders with the correct placeholder", () => {
    expect(screen.getByPlaceholderText(ENTER_USER_NAME)).toBeInTheDocument();
  });

  test("renders with the correct type", () => {
    const inputField = screen.getByRole("textbox", { name: /user name/i });
    expect(inputField).toHaveAttribute("type", "text");
  });
});

describe("Input Component - with formik", () => {
  beforeEach(() => {
    renderWithProviders(
      <Formik initialValues={{ username: "" }} onSubmit={() => {}}>
        <Input {...defaultProps} required />
      </Formik>
    );
  });

  test("renders an asterisk when required", () => {
    inputField();
    const asterisk = screen.getAllByText("*");
    expect(asterisk[0]).toBeInTheDocument();
  });
});
