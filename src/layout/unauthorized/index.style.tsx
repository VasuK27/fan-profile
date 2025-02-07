import { styled } from "@mui/system";
import { Box, Typography } from "@mui/material";

export const StyledBox = styled(Box)(() => ({
  textAlign: "center",
  margin: 0,
  padding: 0,
  backgroundColor: "var(--lightGreen)",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
}));

export const ErrorText = styled(Typography)(() => ({
  color: "var(--lightRed)",
  textShadow: `
    1px 1px 1px var(--orange),    
    2px 2px 1px var(--orange),
    3px 3px 1px var(--orange),
    4px 4px 1px var(--orange),
    5px 5px 1px var(--orange),
    6px 6px 1px var(--orange),
    7px 7px 1px var(--orange),
    8px 8px 1px var(--orange),
    25px 25px 8px rgba(0, 0, 0, 0.2)
  `,
}));
