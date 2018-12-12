import React from 'react';
import { NavLink } from 'react-router-dom';
import { Icon } from '@material-ui/core';

import classes from './SideBar.module.css';

function SideBar(props) {
  const navigations = props.navigations;
  return (
    <div className={classes.SideBar}>
      <div className={classes.Sticky}>
        {
          navigations.map(item => {
            return(
              <NavLink draggable="false" key={item.label} className={classes.Nav} activeClassName={classes.activeLink} to={item.link} >
                <Icon fontSize="small" className={classes.NavIcon}>{item.icon}</Icon>{item.label}
              </NavLink>
            );
          })
        }
      </div> 
      
    </div>
  );
}

export default SideBar;