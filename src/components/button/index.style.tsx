import { Button, styled } from "@mui/material";

export const StyledButton = styled(Button)(({ variant }) => ({
    backgroundColor: variant === "contained" ? "var(--lightPurple)" : "transparent",
    border: variant === "outlined" ? "2px solid var(--lightPurple)" : "none",
    color: variant === "contained" ? "#fff" : "var(--lightPurple)",
}));
