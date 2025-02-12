import { styled, Typography } from "@mui/material";

export const TitleText = styled(Typography)(({ theme }) => ({
  margin: "16px",
  fontSize: "20px",
  fontWeight: 700,
  color: "var(--orange)",
  [theme.breakpoints.down("sm")]: {
    margin: "10px 10px",
  },
}));
