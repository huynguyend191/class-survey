import React from 'react';
import { NavLink } from 'react-router-dom';

function NavigationBar(props) {
  return (
    <div>
      {props.username}
      <NavLink to='signout'>Sign Out</NavLink>
    </div>
  );
}

export default NavigationBar;