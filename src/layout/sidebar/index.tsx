import LogoutIcon from "@mui/icons-material/Logout";
import {
  Box,
  ListItem,
  ListItemIcon,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { listItems } from "constant/SidebarListData";
import { SidebarProps } from "interfaces/global";
import { useLocation, useNavigate } from "react-router-dom";
import { setCurrentUser } from "utils/SetCurrentUser";
import {
  DividerBox,
  ListContainer,
  ListItemBox,
  ListItemTextarea,
  LogoutButton,
  MenuIcon,
  SidebarItemButton,
  StyledDrawer,
} from "./index.style";
import { loginRoute } from "constant/RoutesEndPoint";

const Sidebar = ({ open }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Handle the logout action by clearing the current user and navigating to the login page
  const handleLogout = () => {
    setCurrentUser(null);
    navigate(loginRoute.LOGIN_ROUTE);
  };

  return (
    <StyledDrawer variant="persistent" anchor="left" open isMenuOpen={open}>
      <ListContainer>
        <Box flexGrow={1}>
          {/* Loop through the list of sidebar items */}
          {listItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <ListItem
                key={item.title}
                disablePadding
                onClick={() => navigate(item.path)}
              >
                <DividerBox isMenuOpen={open} />
                <SidebarItemButton isActive={isActive}>
                  <Tooltip
                    title={(isMobile || !open) && item.title}
                    arrow
                    placement="right-start"
                  >
                    <MenuIcon isActive={isActive}>{item.icon}</MenuIcon>
                  </Tooltip>
                  <ListItemTextarea primary={item.title} />
                </SidebarItemButton>
              </ListItem>
            );
          })}
        </Box>

        {/* Logout Button at Bottom */}
        <ListItemBox disablePadding onClick={handleLogout}>
          <LogoutButton>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemTextarea primary="Logout" />
          </LogoutButton>
        </ListItemBox>
      </ListContainer>
    </StyledDrawer>
  );
};

export default Sidebar;
