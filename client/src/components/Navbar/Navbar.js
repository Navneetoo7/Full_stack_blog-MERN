import React, { useState, useEffect } from "react";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import useStyles from "./styles";
import { Link } from "react-router-dom";
import memories from "../../images/1.png";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
const Navbar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  console.log("token", user);
  const history = useNavigate();
  const location = useLocation();
  console.log("locationlocationlocation", location);
  useEffect(() => {
    const token = user?.token;
    //JWT...
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);
  const logout = () => {
    dispatch({ type: "LOGOUT" });
    history("/");
    setUser(null);
  };
  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography variant="h2" component={Link} to="/" align="center">
          Memories
          <img src={memories} alt="memories" height="80" align="center" />
        </Typography>
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user.result.name}
              src={user.result.imageUrl}
            >
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user.result.name}
            </Typography>
            <Button
              variant="conatined"
              className={classes.logout}
              color="secondary"
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            SIGN IN
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
