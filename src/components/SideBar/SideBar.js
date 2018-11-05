import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './SideBar.module.css';

function SideBar(props) {
  const navigations = props.navigations;
  return (
    <div className={classes.SideBar}> 
      {
        navigations.map(item => {
          return(
            <NavLink exact key={item.label} className={classes.Nav} activeClassName={classes.activeLink} to={item.link} >
              {item.label}
            </NavLink>
          );
        })
      }
    </div>
  );
}

export default SideBar;