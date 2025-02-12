import { IconButton } from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";

export const AppBar = styled(MuiAppBar)<MuiAppBarProps>(() => ({
  width: "100%",
  transition: "all 0.3s ease-in-out",
  boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
  backgroundColor: "var(--orange)",
  zIndex: 1201,
}));

export const StyledMenuIconButton = styled(IconButton)(() => ({
  position: "relative",
  "&::before": {
    content: '""',
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgb(255, 255, 255)",
    opacity: 0.1,
    borderRadius: "50%",
    top: 0,
    left: 0,
  },
}));

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export const UserInfo = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  marginLeft: "auto",
  gap: "10px",
  color: "#fff",
}));

export const Main = styled("main", {
  shouldForwardProp: (prop) => prop !== "open",
})<{ open: boolean }>(({ theme, open }) => ({
  flexGrow: 1,
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),

  [theme.breakpoints.down("xl")]: {
    padding: "24px",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "10px 0px",
  },
}));
