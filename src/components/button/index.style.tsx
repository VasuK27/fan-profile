import { Button, styled } from "@mui/material";

export const StyledButton = styled(Button)(({ variant }) => ({
  backgroundColor: variant === "contained" ? "var(--orange)" : "transparent",
  border: variant === "outlined" ? "2px solid var(--orange)" : "none",
  color: variant === "contained" ? "#fff" : "var(--orange)",
}));
