import { screen } from "@testing-library/react";
import Driver from ".";
import {
  CODE_TEXT,
  CONSTRUCTORS_DETAILS,
  DOB,
  DRIVER_DETAILS,
  DRIVER_ID,
  FAMILY_NAME,
  GIVEN_NAME,
  NAME,
  NATIONALITY,
  POINTS,
  USER_DETAILS,
} from "constant/TitleText";
import { renderWithProviders } from "utils/RenderWithProviders";
import { EMAIL } from "constant/InputLabel";

// Helper function to check text presence
const checkTextPresence = (texts: string[]) => {
  texts.forEach((text) => expect(screen.getByText(text)).toBeInTheDocument());
};

describe("Driver Component - Driver list", () => {
  beforeEach(() => {
    renderWithProviders(<Driver />);
  });

  test("render header - title text of details", () => {
    checkTextPresence([DRIVER_DETAILS, CONSTRUCTORS_DETAILS, USER_DETAILS]);
  });

  test("render title - sub title of driver details", () => {
    checkTextPresence([
      GIVEN_NAME,
      FAMILY_NAME,
      DOB,
      NATIONALITY,
      CODE_TEXT,
      DRIVER_ID,
      POINTS,
    ]);
  });

  test("render title - sub title of constructor details", () => {
    checkTextPresence([NAME, NATIONALITY]);
  });

  test("render title - sub title of user details", () => {
    checkTextPresence([NAME, EMAIL]);
  });
});
