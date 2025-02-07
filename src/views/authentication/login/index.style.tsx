import { Box } from "@mui/material";
import { styled } from "@mui/system";

export const ContainerBox = styled(Box)({
  width: "100%",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const LoginImage = styled("img")(() => ({
  width: "300px",
  marginTop: "20px",
}));

export const LoginImageBox = styled(Box)(({ theme }) => ({
  height: "100%",
  borderRadius: "20px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "100px 0px",
  background:
    "linear-gradient(217.64deg, rgba(236, 133, 134, 0.25) -5.84%, rgba(221, 94, 96, 0.25) 106.73%)",
  [theme.breakpoints.down("xl")]: {
    paddingRight: "0px",
  },
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));
