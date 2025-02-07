import * as Yup from "yup";
import {
  INVALID_EMAIL,
  REQUIRED_EMAIL,
  REQUIRED_USER_NAME,
} from "./ErrorMessages";

// user details page validation schema
export const userDetailsValidation = Yup.object().shape({
  username: Yup.string().required(REQUIRED_USER_NAME),
  email: Yup.string().email(INVALID_EMAIL).required(REQUIRED_EMAIL),
});
