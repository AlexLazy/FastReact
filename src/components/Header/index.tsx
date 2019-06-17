import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';

import { NavLink } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  link: {
    marginRight: theme.typography.pxToRem(15),
    color: '#fff',
    textDecoration: 'none',
    transition: '.3s color',
    '&:hover, &.active': {
      color: 'rgb(244, 67, 54)'
    }
  }
}));

function Header() {
  const classes = useStyles();

  return (
    <AppBar position='static'>
      <Toolbar>
        <NavLink className={classes.link} exact to='/'>
          Task 1
        </NavLink>
        <NavLink className={classes.link} to='/task2'>
          Task 2
        </NavLink>
        <NavLink className={classes.link} to='/task2'>
          Task 3
        </NavLink>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
