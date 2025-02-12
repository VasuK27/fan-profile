import { FC } from "react";
import { Typography, Modal as MuiModal, Grid2 } from "@mui/material";
import { ReusableModalProps } from "interfaces/custom";
import {
  ChildrenBox,
  IconButtonStyled,
  ModalFirstLabelStyled,
  ModalSecondLabelStyled,
  StyledModalBox,
} from "./index.style";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const Modal: FC<ReusableModalProps> = ({
  open,
  handleClose,
  label,
  children,
  isGrayBlock = true,
  icon = true,
}) => {
  return (
    <MuiModal open={open} onClose={handleClose} aria-labelledby="modal-title">
      <StyledModalBox>
        <Grid2
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={1.5}
        >
          <ModalFirstLabelStyled>
            {isGrayBlock && <ModalSecondLabelStyled />}
            <Typography fontSize={{ xs: "20px", sm: "24px" }} fontWeight={600}>
              {label}
            </Typography>
          </ModalFirstLabelStyled>
          {icon && (
            <IconButtonStyled onClick={handleClose}>
              <HighlightOffIcon sx={{ color: "var(--lightPurple)" }} />
            </IconButtonStyled>
          )}
        </Grid2>
        <ChildrenBox>{children}</ChildrenBox>
      </StyledModalBox>
    </MuiModal>
  );
};

export default Modal;
