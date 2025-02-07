import MenuIcon from "@mui/icons-material/Menu";
import { Avatar, Box, Toolbar, Typography } from "@mui/material";
import Sidebar from "layout/sidebar";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { getCurrentUser } from "utils/GetCurrentUser";
import {
  AppBar,
  DrawerHeader,
  Main,
  StyledMenuIconButton,
  UserInfo,
} from "./index.style";

const Header = () => {
  const [open, setOpen] = useState(true);

  // Toggle the drawer open/close
  const toggleDrawer = () => {
    setOpen((prev) => !prev);
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* AppBar Component */}
      <AppBar position="fixed">
        <Toolbar>
          {/* Left - Menu Icon */}
          <StyledMenuIconButton
            color="inherit"
            aria-label="toggle drawer"
            onClick={toggleDrawer}
            edge="start"
          >
            <MenuIcon />
          </StyledMenuIconButton>

          {/* Right - User Info */}
          <UserInfo>
            <Avatar sx={{ bgcolor: "var(--white)", color: "black" }}>
              {getCurrentUser().username.at(0).toUpperCase()}
            </Avatar>
            <Box>
              <Typography variant="body1" fontWeight={600}>
                {getCurrentUser().username}
              </Typography>
              <Typography
                variant="body2"
                sx={{ opacity: 0.8 }}
                fontWeight={500}
              >
                {getCurrentUser().email}
              </Typography>
            </Box>
          </UserInfo>
        </Toolbar>
      </AppBar>

      {/* Sidebar Component */}
      <Sidebar open={open} />

      {/* Main Content */}
      <Main open={open}>
        <DrawerHeader />
        <Typography>
          <Outlet />
        </Typography>
      </Main>
    </Box>
  );
};

export default Header;
