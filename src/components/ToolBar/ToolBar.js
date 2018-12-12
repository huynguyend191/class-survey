import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './ToolBar.module.css';


function ToolBar(props) {
  return (
    <div className={classes.ToolBar}>
      {
        props.navigations.map(nav => {
          return (
            <NavLink draggable="false" exact key={nav.label} className={classes.Nav} activeClassName={classes.activeLink} to={nav.link} >
              {nav.label}
            </NavLink>
          );
        })
      }
    </div>
  );
}

export default ToolBar;