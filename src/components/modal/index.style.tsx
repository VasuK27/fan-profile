import { Box, IconButton, Typography } from "@mui/material";
import { styled } from "@mui/system";

export const StyledModalBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 650,
  backgroundColor: "var(--white)",
  padding: "20px",
  borderRadius: "16px",
  overflowY: "auto",
  [theme.breakpoints.down("md")]: {
    maxWidth: "500px",
    margin: "0px 10px",
  },
}));

export const ModalFirstLabelStyled = styled(Typography)(() => ({
  fontWeight: 600,
  display: "flex",
  alignItems: "center",
  fontSize: "16px",
}));

export const ModalSecondLabelStyled = styled(Typography)(() => ({
  width: "12px",
  height: "32px",
  backgroundColor: "var(--lightPurple)",
  marginRight: "16px",
  borderRadius: "4px",
}));

export const IconButtonStyled = styled(IconButton)(() => ({
  padding: "0px",
}));

export const ChildrenBox = styled(Box)(() => ({
  maxHeight: "65vh",
  overflowY: "scroll",
}));
