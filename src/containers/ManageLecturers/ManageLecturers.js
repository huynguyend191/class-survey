import React, { Component } from 'react';
import ToolBar from '../../components/ToolBar/ToolBar';
import { manageLecturerToolbar } from '../../utils/navigations';

import classes from './ManageLecturers.module.css';

class ManageLecturers extends Component {
  render() {
    return (
      <div className={classes.ManageLecturers}>
        <ToolBar navigations={manageLecturerToolbar}/>
      </div>
    );
  }
}

export default ManageLecturers;