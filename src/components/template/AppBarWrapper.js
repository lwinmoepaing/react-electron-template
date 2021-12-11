import React from "react";
import { useCallback } from "react";
import { useHistory } from "react-router";
import { styled, useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import Logout from "@mui/icons-material/Logout";
import Collapse from "@mui/material/Collapse";
import TitleHook from "../../hooks/common/TitleHook";
import AuthHook from "../../hooks/auth/AuthHook";
import LanguageHook from "../../hooks/common/LanguageHook";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import { appActions } from "../../store/reducers/appReducer";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1),
  paddingLeft: 20,
  color: theme.palette.primary.main,
  borderTop: "1px solid #dfdfdf",
  marginBottom: 1,
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const listContainerStyle = {
  paddingLeft: 4,
  paddingRight: 4,
};

const listStyle = {
  borderRadius: 4,
  paddingTop: 2,
  paddingBottom: 2,
  marginTop: 6,
  marginBottom: 6,
};

const iconStyle = {
  fontSize: 26,
  backgroundColor: "#f0f7ff",
  padding: 4,
  borderRadius: 4,
};

const listTextStyle = {
  "& span": {
    fontSize: 14,
  },
};

function AppBarWrapper() {
  const { title } = TitleHook();
  const { logoutUser } = AuthHook();
  const { setChangeLanguage } = LanguageHook();
  const history = useHistory();
  const theme = useTheme();
  const open = useSelector(({ app }) => app.isOpenDrawer);
  const openLog = useSelector(({ app }) => app.isOpenLogToggle);
  const dispatch = useDispatch();

  const toggleDrawer = useCallback(() => {
    dispatch({
      type: appActions.TOGGLE_DRAWER,
    });
  }, [dispatch]);

  const toggleLog = useCallback(() => {
    dispatch({
      type: appActions.LOG_TOGGLE,
    });
  }, [dispatch]);

  const onLogout = useCallback(async () => {
    await setChangeLanguage("en");
    await logoutUser();
    history.replace("/");
  }, [history]);

  const linkTo = useCallback(
    (url) => {
      if (history.location.pathname === url) {
        return;
      }
      return history.push(url);
    },
    [history]
  );

  return (
    <>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        style={{
          backgroundColor: "#fff",
          color: theme.palette.primary.main,
          boxShadow: "none",
          borderBottom: "1px solid #dfdfdf",
          borderTop: "1px solid #dfdfdf",
        }}
      >
        <Toolbar>
          {!open && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              edge="start"
              sx={{
                marginRight: "36px",
              }}
            >
              <MenuIcon />
            </IconButton>
          )}
          {!open && (
            <Typography variant="h6" noWrap component="div">
              {title}
            </Typography>
          )}
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <Typography variant="h6" noWrap component="div">
            {title}
          </Typography>
          <IconButton color="inherit" onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>

        <Divider />
        <List style={listContainerStyle}>
          <ListItem button style={listStyle} onClick={() => linkTo("/home")}>
            <ListItemIcon>
              <InboxIcon color="primary" style={iconStyle} />
            </ListItemIcon>
            <ListItemText primary={"Home"} sx={listTextStyle} />
          </ListItem>
        </List>

        <Divider />
        <List style={listContainerStyle}>
          <ListItem button style={listStyle} onClick={toggleLog}>
            <ListItemIcon>
              <ReceiptLongIcon
                color="primary"
                style={{
                  ...iconStyle,
                }}
              />
            </ListItemIcon>
            <ListItemText primary="Logs" sx={listTextStyle} />
            {openLog ? (
              <ExpandLess fontSize={"6"} color="primary" />
            ) : (
              <ExpandMore fontSize={"6"} color="primary" />
            )}
          </ListItem>
          <Collapse in={openLog} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                button
                sx={open ? { pl: 4 } : {}}
                style={listStyle}
                onClick={() => {}}
              >
                <ListItemIcon>
                  <ContactMailIcon
                    color="primary"
                    style={{
                      ...iconStyle,
                    }}
                  />
                </ListItemIcon>
                <ListItemText primary="User Logs" sx={listTextStyle} />
              </ListItem>
            </List>
          </Collapse>

          <ListItem button style={listStyle} onClick={() => linkTo("/about")}>
            <ListItemIcon>
              <InfoOutlinedIcon
                color="primary"
                style={{
                  ...iconStyle,
                }}
              />
            </ListItemIcon>
            <ListItemText primary="About" sx={listTextStyle} />
          </ListItem>

          <ListItem button style={listStyle} onClick={onLogout}>
            <ListItemIcon>
              <Logout
                style={{
                  ...iconStyle,
                  backgroundColor: "#f5e4e4",
                  color: "#f36262",
                }}
              />
            </ListItemIcon>
            <ListItemText primary="Logout" sx={listTextStyle} />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}

export default AppBarWrapper;
