import { Box, Card, Chip, IconButton, Pagination } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Language } from "@mui/icons-material";

export const StyledCard = styled(Card)(() => ({
  background: "rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(10px)",
  borderRadius: "12px",
  padding: "16px",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.3)",
  },
}));

export const WikipediaButton = styled(Language)(() => ({
  color: "var(--lightPurple)",
}));

export const StyledMenuIconButton = styled(IconButton)(() => ({
  color: "var(--lightBlack)",
  position: "relative",
  "&::before": {
    content: '""',
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "var(--lightGray)",
    opacity: 0.1,
    borderRadius: "50%",
    top: 0,
    left: 0,
  },
}));

export const TextAndLoading = styled(Box)(() => ({
  width: "100%",
  height: "60vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "20px",
  fontWeight: 600,
  color: "var(--lightBlack)",
}));

export const ChipText = styled(Chip)(() => ({
  fontWeight: "bold",
  fontSize: "12px",
  mr: 1,
  backgroundColor: "var(--lightPink)",
  color: "var(--lightPurple)",
  borderRadius: "6px",
  ".MuiChip-label": {
    padding: "0px 8px",
  },
}));

export const StyledPagination = styled(Pagination)(() => ({
  "& .Mui-selected": {
    backgroundColor: "var(--lightPurple) !important",
    color: "#fff !important",
  },
}));

export const WikipediaLink = styled("a")(() => ({
  textDecoration: "none",
  color: "inherit",
}));
