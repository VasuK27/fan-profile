import * as Yup from "yup";
import {
  INVALID_EMAIL,
  REQUIRED_EMAIL,
  REQUIRED_USER_NAME,
} from "./ErrorMessages";

// email validation function with customizable message
const emailValidation = () =>
  Yup.string()
    .matches(
      /^[A-Za-z][A-Za-z0-9._%+-]*@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/,
      INVALID_EMAIL
    )
    .required(REQUIRED_EMAIL);

// user details page validation schema
export const userDetailsValidation = Yup.object().shape({
  username: Yup.string().required(REQUIRED_USER_NAME),
  email: emailValidation(),
});
