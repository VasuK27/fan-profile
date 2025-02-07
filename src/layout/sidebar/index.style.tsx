import { styled } from "@mui/material/styles";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { DividerProps, SidebarDrawerProps } from "interfaces/global";

export const StyledDrawer = styled(Drawer)<SidebarDrawerProps>(
  ({ isMenuOpen, theme }) => ({
    transition: "width 0.3s ease-in-out",
    width: isMenuOpen ? 240 : 70,
    flexShrink: 0,
    [theme.breakpoints.down("md")]: {
      width: 70,
    },
    "& .MuiDrawer-paper": {
      transition: "width 0.3s ease-in-out",
      width: isMenuOpen ? 240 : 70,
      boxSizing: "border-box",
      borderRight: "none",
      height: "88vh",
      marginBottom: "10px",
      borderRadius: "0px 20px 20px 0px",
      boxShadow: "4px 0px 12px var(--silver)",
      marginTop: "90px",
      [theme.breakpoints.down("md")]: {
        width: 70,
      },
    },
  })
);

export const SidebarItemButton = styled(ListItemButton)<{ isActive?: boolean }>(
  ({ isActive }) => ({
    backgroundColor: isActive ? "var(--lightPurple)" : "var(--black)",
    borderRadius: "8px",
    margin: "0px 10px",
    color: isActive ? "var(--white)" : "var(--lightBlack)",
    marginRight: "5px !important",
    marginTop: "8px",
    "&:hover": {
      backgroundColor: "var(--lightPurple)",
    },
  })
);

export const DividerBox = styled(Drawer)<DividerProps>(({ isMenuOpen }) => ({
  width: isMenuOpen ? "6px" : "0px",
  height: "45px",
  backgroundColor: "var(--lightPurple)",
  borderRadius: "8px",
}));

export const ListItemTextarea = styled(ListItemText)({
  "& .MuiTypography-root": {
    fontWeight: 600,
  },
});

export const LogoutButton = styled(ListItemButton)({
  backgroundColor: "var(--red)",
  borderRadius: "8px",
  margin: "10px",
  color: "var(--white)",
});

export const MenuIcon = styled(ListItemIcon)<{ isActive?: boolean }>(
  ({ isActive }) => ({
    color: isActive ? "var(--white)" : "var(--lightBlack)",
  })
);

export const ListContainer = styled(List)({
  height: "100%",
  display: "flex",
  flexDirection: "column",
});

export const ListItemBox = styled(ListItem)({
  justifyContent: "center",
  margin: "0px !important",
  "& .MuiListItemButton-root": {
    margin: "0px 10px",
    padding: "2px 10px",
    "&:hover": {
      backgroundColor: "var(--white)",
    },
  },
  "& .MuiSvgIcon-root": {
    color: "var(--lightBlack)",
  },
  "& .MuiTypography-root ": {
    color: "var(--lightBlack)",
  },
});
