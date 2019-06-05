import React from "react";
import AppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";

import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  link: {
    marginRight: theme.typography.pxToRem(15),
    color: "#fff",
    textDecoration: "none",
    transition: ".3s color",
    "&:hover": {
      color: "rgb(244, 67, 54)"
    }
  }
}));

function Header() {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <Link className={classes.link} to="/">
          Task 1
        </Link>
        <Link className={classes.link} to="/task2">
          Task 2
        </Link>
        <Link className={classes.link} to="/task2">
          Task 3
        </Link>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
