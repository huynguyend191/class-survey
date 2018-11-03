import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './SideBar.module.css';

function SideBar(props) {
  return (
    <div className={classes.SideBar}>
        
      <NavLink className={classes.Nav} activeClassName={classes.activeLink} to='/upload' >
        Upload
      </NavLink>
      <NavLink className={classes.Nav} activeClassName={classes.activeLink} to='/list'>
        List
      </NavLink>
    
    </div>
  );
}

export default SideBar;