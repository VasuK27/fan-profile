import { Box, CircularProgress } from "@mui/material";
import { styled } from "@mui/material/styles";

export const LoadingBox = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  height: "100%",
  alignItems: "center",
}));

export const CircleBox = styled(CircularProgress)<{}>(() => ({
  height: "26px !important",
  width: "26px !important",
  color: `red !important`,
}));
