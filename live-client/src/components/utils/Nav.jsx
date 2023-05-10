import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import Brightness3Icon from "@mui/icons-material/Brightness3"; // Moon icon
import WbSunnyIcon from "@mui/icons-material/WbSunny"; // Sun icon

// Material UI Components
import {
  Button,
  Link,
  Drawer,
  IconButton,
  Box,
  List,
  ListItem,
  Hidden,
  Switch,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
// Files
import "../css/nav.css";
// Actions
import { logout } from "../../actions/auth";

const Nav = (props) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDrawer = (open) => (event) => {
    setDrawerOpen(open);
  };
  // new handler for dark mode switch
  const handleThemeChange = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    // Update the body class based on the dark mode state
    document.body.className = darkMode ? "dark-mode" : "light-mode";
  }, [darkMode]);

  const mobileMenu = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {!props.isAuth && (
          <ListItem button component={RouterLink} to="/login">
            Login
          </ListItem>
        )}

        {props.isAuth && (
          <ListItem button component={RouterLink} to="/dashboard">
            Dashboard
          </ListItem>
        )}
        {props.isAuth && (
          <ListItem button component={RouterLink} to="/postad">
            Post Ad
          </ListItem>
        )}
        {props.isAuth && (
          <ListItem
            button
            component={RouterLink}
            to="/login"
            onClick={props.logout}
          >
            Logout
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <div className="nav">
      <div className="nav__group1">
        <div className="nav__image-container">
          <RouterLink to="/" style={{ textDecoration: "none" }}>
            <h2>Auction AEH</h2>
          </RouterLink>
        </div>

        <Hidden smDown>
          {props.isAuth && (
            <div className="nav__buttons">
              <RouterLink to="/" style={{ textDecoration: "none" }}>
                <Button>Home</Button>
              </RouterLink>
              <RouterLink to="/dashboard" style={{ textDecoration: "none" }}>
                <Button>Dashboard</Button>
              </RouterLink>
              <RouterLink to="/postad" style={{ textDecoration: "none" }}>
                <Button>Post Ad</Button>
              </RouterLink>
            </div>
          )}
        </Hidden>
      </div>

      <div className="nav__group2">
        <div className="nav__account">
          <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            p={2}
          >
            <WbSunnyIcon />
            <Box mx={1}>
              <Switch checked={darkMode} onChange={handleThemeChange} />
            </Box>
            <Brightness3Icon />
          </Box>

          {props.isAuth ? (
            <Hidden smDown>
              <Link
                href="#"
                color="inherit"
                onClick={props.logout}
                sx={{ textDecoration: "none" }}
              >
                Logout
              </Link>
            </Hidden>
          ) : (
            <Hidden smDown>
              <RouterLink to="/login" sx={{ textDecoration: "none" }}>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ borderRadius: "50px", padding: "10px 20px" }}
                >
                  Login
                </Button>
              </RouterLink>
            </Hidden>
          )}
        </div>

        <Hidden smUp>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor="right"
            open={drawerOpen}
            onClose={toggleDrawer(false)}
          >
            {mobileMenu}
          </Drawer>
        </Hidden>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(Nav);
