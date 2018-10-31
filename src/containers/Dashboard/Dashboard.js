import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import UploadFileArea from '../UploadFileArea/UploadFileArea';

class Dashboard extends Component {
  render() {
    
    return (
      <div>
        <NavLink to='signout'>Sign Out</NavLink>
        <UploadFileArea />
      </div>
    );
  }
}

export default Dashboard;