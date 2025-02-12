import { Box, IconButton, Typography } from "@mui/material";
import { styled } from "@mui/system";

export const StyledModalBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "var(--white)",
  padding: "20px",
  borderRadius: "16px",
  overflowY: "auto",
  width: 650,

  [theme.breakpoints.down("md")]: {
    maxWidth: "90%",
  },
  [theme.breakpoints.down("sm")]: {
    width: "85%",
    padding: "14px",
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
  backgroundColor: "var(--orange)",
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
