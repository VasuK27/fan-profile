import { TextField } from "@mui/material";
import { styled } from "@mui/styles";

export const TextFieldInput = styled(TextField)(() => ({
  "& input:-webkit-autofill": {
    WebkitBoxShadow: "0 0 0 1000px transparent inset !important",
    transition: "background-color 5000s ease-in-out 0s",
  },
}));

export const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: `1px solid var(--lavenderGray) !important`,
    },
    "&:hover fieldset": {
      border: `1px solid var(--lavenderGray) !important`,
    },
    "&.Mui-focused fieldset": {
      border: `1px solid var(--lavenderGray) !important`,
    },
    "& input": {
      "&::placeholder": {
        opacity: 0.5,
      },
    },
  },
  "& .MuiInputLabel-root": {
    color: "var(--lightBlack) !important",
  },
});

export const RequiredStar = styled("span")(() => ({
  color: "var(--errorDarkRed)",
  paddingLeft: "5px",
}));
