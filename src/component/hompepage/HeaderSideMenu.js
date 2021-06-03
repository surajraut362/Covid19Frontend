import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import LogoutComponent from "../pages/LogoutComponent";
import { AccountCircle } from "@material-ui/icons";
import header from "../images/mylogo.png";
import { Box, LinearProgress } from "@material-ui/core";
const drawerWidth = 170;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    marginBottom: "12px",
    width: "100%",
  },
  appBar: {
    backgroundColor: "#ededed",
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appHeader: {
    color: "black",
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    color: "black",
    padding: 0,
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    alignItems: "center",
    backgroundColor: "#ededed",
    width: drawerWidth,
  },
  sideBarMenu: {
    alignItems: "center",
    padding: 0,
    color: "black",
  },
  drawerHeader: {
    marginTop: -4,
    display: "flex",
    alignItems: "center",
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },

  menuTitle: {
    color: "black",
    textAlign: "center",
    marginRight: 2,
  },

  userName: {
    alignItems: "center",
    marginLeft: 880,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  userNameShift: {
    marginLeft: 750,
    marginBottom: 9,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  Button: {
    textDecoration: "none",
  },
}));

function HeaderSideMenu(props) {
  const [userName, setUserName] = useState(
    JSON.parse(sessionStorage.getItem("username"))
  );
  useEffect(() => {
    let userName = JSON.parse(sessionStorage.getItem("username"));
    if (userName) setUserName(userName);
  }, [props.location.key]);
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root} data-testid="headersidemenu">
      <CssBaseline />

      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="default"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Box>
            <ListItem button onClick={() => props.history.push("/")}>
              <h6 className={classes.appHeader}>
                <img src={header} style={{ width: 180, padding: 0 }} />
              </h6>
            </ListItem>
          </Box>
          <Typography
            className={clsx(classes.userName, {
              [classes.userNameShift]: open,
            })}
          >
            {userName ? (
              <ListItem
                button
                aria-controls="profile-menu"
                aria-haspopup="false"
                onClick={handleClick}
                className="text-dark"
              >
                <AccountCircle />
                {userName["username"]}
              </ListItem>
            ) : (
              <ListItem
                button
                className="text-dark"
                onClick={() => props.history.push("/login")}
              >
                <ExitToAppIcon />
                Login
              </ListItem>
            )}

            <Menu
              id="profile-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem>
                <ListItem button data-toggle="modal" data-target="#logoutModal">
                  Logout
                </ListItem>
              </MenuItem>
              <MenuItem>
                <ListItem
                  button
                  onClick={() => props.history.push("/dashboard")}
                >
                  Dashboard
                </ListItem>
              </MenuItem>
            </Menu>
          </Typography>
          <div
            className="modal fade "
            id="logoutModal"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <LogoutComponent {...props} setUserName={() => setUserName(null)} />
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        closeAfterTransition="true"
        classes={{ paper: classes.drawerPaper }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>

        <List className={classes.drawer}>
          <Divider />

          {userName != null ? (
            <>
              <ListItem button onClick={() => props.history.push("/dashboard")}>
                Dashboard
              </ListItem>

              <ListItem button onClick={() => props.history.push("/admin")}>
                Admin
              </ListItem>

              <ListItem button onClick={() => props.history.push("/hospital")}>
                Hospital
              </ListItem>
              <ListItem button onClick={() => props.history.push("/patient")}>
                Patient
              </ListItem>
            </>
          ) : (
            <></>
          )}
          <ListItem button onClick={() => props.history.push("/guidelines")}>
            GuideLines
          </ListItem>

          <ListItem button onClick={() => props.history.push("/contactus")}>
            Contact Us
          </ListItem>
          {userName != null ? (
            <ListItem button data-toggle="modal" data-target="#logoutModal">
              Logout
            </ListItem>
          ) : (
            <ListItem button onClick={() => props.history.push("/login")}>
              Login
            </ListItem>
          )}
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
      </main>
    </div>
  );
}

export default HeaderSideMenu;
