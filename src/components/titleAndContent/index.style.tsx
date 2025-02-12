import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const ContentText = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  color: "var(--textGray)",
  fontWeight: 600,
  [theme.breakpoints.down("sm")]: {
    wordBreak: "break-word",
    whiteSpace: "normal",
  },
}));
