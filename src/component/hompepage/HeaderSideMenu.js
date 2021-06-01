import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import * as Icon from "react-bootstrap-icons";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import MoreVertIcon from "@material-ui/icons/MoreVert";
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
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Link, Route } from "react-router-dom";
import LogoutComponent from "../pages/LogoutComponent";
import { AccountCircle } from "@material-ui/icons";
import { Footer } from "./Footer";
import Routes from "../../Routes";
import header from "../images/header.png";
import { Box, Grid } from "@material-ui/core";
const drawerWidth = 150;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    marginBottom: "-44px",
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
    fontSize: 25,
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
  link: {
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
    <div className={classes.root}>
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
            <Link to="/">
              <h6 className={classes.appHeader}>
                <img src={header} style={{ width: 40 }} />
                Covid19Tracker
              </h6>
            </Link>
          </Box>
          <Typography
            className={clsx(classes.userName, {
              [classes.userNameShift]: open,
            })}
          >
            {userName ? (
              <Button
                aria-controls="profile-menu"
                aria-haspopup="false"
                onClick={handleClick}
              >
                <AccountCircle />
                {userName["username"]}
              </Button>
            ) : (
              <Link to="/login">
                <Button>
                  <ExitToAppIcon />
                  Login
                </Button>
              </Link>
            )}

            <Menu
              id="profile-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem>
                <Button data-toggle="modal" data-target="#logoutModal">
                  Logout
                </Button>
              </MenuItem>
              <MenuItem>
                <Button>
                  <Link to="/dashboard">
                    <ListItemText secondary="Dashboard" />
                  </Link>
                </Button>
              </MenuItem>
            </Menu>
          </Typography>
          <div
            class="modal fade "
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
          <h5 className={classes.menuTitle}>Menu</h5>
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
              <ListItem button>
                <Link to="/dashboard" className={classes.link}>
                  DashBoard
                </Link>
              </ListItem>

              <ListItem button>
                <Link to="/admins" className={classes.link}>
                  Admin
                </Link>
              </ListItem>
              <ListItem button>
                <Link to="/patients" className={classes.link}>
                  Patient
                </Link>
              </ListItem>
              <ListItem button>
                <Link to="/hospitals" className={classes.link}>
                  Hospital
                </Link>
              </ListItem>
            </>
          ) : (
            <></>
          )}

          <Link to="/guidelines" className={classes.link}>
            <ListItem button>GuideLines</ListItem>
          </Link>
          <Link to="/contactus" className={classes.link}>
            <ListItem button>Contact Us</ListItem>
          </Link>
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
