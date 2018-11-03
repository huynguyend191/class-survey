import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './ToolBar.module.css';

function ToolBar(props) {
  return (
    <div className={classes.ToolBar}>
      <NavLink className={classes.Nav} activeClassName={classes.activeLink} to='/upload' >
        Upload
      </NavLink>
      <NavLink className={classes.Nav} activeClassName={classes.activeLink} to='/list'>
        List
      </NavLink>
    
    </div>
  );
}

export default ToolBar;