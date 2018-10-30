import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'

class Dashboard extends Component {
  render() {
    
    return (
      <div>
        <NavLink to='signout'>Sign Out</NavLink>
        <div>DASHBOARD</div>
      </div>
    );
  }
}

export default Dashboard;