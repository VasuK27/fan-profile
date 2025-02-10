import { FC } from "react";
import { CustomButtonProps } from "interfaces/custom";
import { StyledButton } from "./index.style";
import { Box } from "@mui/material";
import MainLoading from "components/mainLoading";

const Button: FC<CustomButtonProps> = ({
  variant = "contained",
  label,
  type = "button",
  fullWidth = false,
  loading = false,
  disabled = false,
  ...rest
}) => {
  return (
    <StyledButton
      type={type}
      variant={variant}
      {...rest}
      fullWidth={fullWidth}
      disabled={disabled || loading}
    >
      {loading && <MainLoading />}
      {label && (
        <Box whiteSpace="nowrap" marginLeft={loading ? "5px" : 0}>
          {label}
        </Box>
      )}
    </StyledButton>
  );
};

export default Button;
