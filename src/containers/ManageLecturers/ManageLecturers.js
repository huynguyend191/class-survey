import React, { Component } from 'react';
import ToolBar from '../../components/ToolBar/ToolBar';
import { manageLecturerToolbar } from '../../utils/navigations';
import { Switch, Route } from 'react-router-dom';
import UploadFileArea from '../../containers/UploadFileArea/UploadFileArea';
import LecturerAccounts from '../LecturerAccounts/LecturerAccounts';

import classes from './ManageLecturers.module.css';

class ManageLecturers extends Component {
  render() {
    return (
      <div className={classes.ManageLecturers}>
        <ToolBar navigations={manageLecturerToolbar}/>
        <Switch>
          <Route path='/lecturers/upload' component={UploadFileArea}/>
          <Route path='/lecturers' exact component={LecturerAccounts} />
        </Switch>
      </div>
    );
  }
}

export default ManageLecturers;