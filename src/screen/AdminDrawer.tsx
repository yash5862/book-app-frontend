import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
// import Link from "@material-ui/core/Link";
import { NavLink } from "react-router-dom";
import Logo from "../core/components/Logo";
import { useSelector, useDispatch } from "react-redux";
import PersonIcon from "@material-ui/icons/Person";

import { toggleDrawer } from "../store/drawer/drawerAction";
import { drawerCollapsedWidth, drawerWidth } from "../core/config/layout";
import LightModeIcon from "@material-ui/icons/LightMode";
import NightlightRoundIcon from "@material-ui/icons/NightlightRound";
import { Button, ButtonGroup } from "@material-ui/core";
import { modeHanlder } from "../store/auth/authAction";
import { useState } from "react";
// import { fontSize } from "@material-ui/system";

export const menuItem = [
  {
    icon: HomeIcon,
    key: "Home",
    path: "/dashboard",
  },
];

const AdminDrawer = () => {
  const { auth, drawerData }: any = useSelector((state) => state);
  const width = drawerData.collapsed ? drawerCollapsedWidth : drawerWidth;
  const dispatch: any = useDispatch();
  const [AdminPathHandler, setAdminPathHandler] = useState(`/user/profile`);

  const drawer = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100%",
        boxShadow: 1,
      }}
    >
      <Logo sx={{ display: "flex", p: 4 }} />
      <List component="nav" sx={{ px: 2 }}>
        {menuItem.map((item, index) => (
          <ListItem button={true} key={index}>
            <NavLink
              className={(props) => {
                return `${props.isActive ? "isActive " : ""}NavLink`;
              }}
              end={true}
              to={item.path}
            >
              <ListItemAvatar>
                <Avatar sx={{ color: "inherit", bgcolor: "transparent" }}>
                  <item.icon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={item.key}
                sx={{
                  display: drawerData.collapsed ? "none" : "block",
                }}
              />
            </NavLink>
          </ListItem>
        ))}
      </List>
      <Box sx={{ flexGrow: 1 }} />
      <List component="nav" sx={{ p: 2 }}>
        {/* <ButtonGroup style={{ marginBottom: "20px" }}>
          <Button
            onClick={() => {
              dispatch(modeHanlder("dark"));
            }}
          >
            <LightModeIcon />
          </Button>
          <Button
            onClick={() => {
              dispatch(modeHanlder("light"));
            }}
          >
            <NightlightRoundIcon />
          </Button>
        </ButtonGroup> */}

        <ListItem button={true}>
          <ListItemAvatar>
            <Avatar>
              <ExitToAppIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            onClick={() => {
              localStorage.clear();
              window.location.href = "/";
            }}
            primary={"Logout"}
            sx={{
              display: drawerData.collapsed ? "none" : "block",
            }}
          />
        </ListItem>
      </List>
    </Box>
  );
  return (
    <Box
      aria-label="Admin drawer"
      component="nav"
      sx={{
        width: { lg: width },
        flexShrink: { lg: 0 },
      }}
    >
      <Drawer
        variant="temporary"
        open={drawerData.isOpen}
        onClose={() => {
          dispatch(toggleDrawer());
        }}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", lg: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width,
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        open={true}
        sx={{
          display: { xs: "none", lg: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width,
          },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
};
export default AdminDrawer;
