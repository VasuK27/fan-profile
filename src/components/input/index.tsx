import { FC } from "react";
import { Field, ErrorMessage } from "formik";
import { FormControl, FormHelperText } from "@mui/material";
import { RequiredStar, StyledTextField } from "./input.style";
import { InputProps } from "interfaces/custom";

const Input: FC<InputProps> = ({
  name,
  label,
  type = "text",
  placeholder,
  required = false,
}) => {
  return (
    <FormControl fullWidth margin="normal" required={required} error={false}>
      <Field
        as={StyledTextField}
        id={name}
        name={name}
        type={type}
        label={
          label && required ? (
            <>
              <span>{label}</span>
              <RequiredStar>*</RequiredStar>
            </>
          ) : (
            <>{label}</>
          )
        }
        placeholder={placeholder}
        variant="outlined"
        fullWidth
        focused
        autoComplete="off"
      />
      <ErrorMessage name={name} component="div">
        {(msg) => <FormHelperText error>{msg}</FormHelperText>}
      </ErrorMessage>
    </FormControl>
  );
};

export default Input;
