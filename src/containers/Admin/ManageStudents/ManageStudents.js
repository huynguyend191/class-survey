import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import ToolBar from '../../../components/ToolBar/ToolBar';
import UploadFileArea from '../UploadFileArea/UploadFileArea';
import { manageStudentToolbar } from '../../../utils/navigations';
import classes from './ManageStudents.module.css';
import StudentAccounts from '../StudentAccounts/StudentAccounts';

class ManageStudents extends Component {
  render() {
    return (
      <div className={classes.ManageStudents}>
        <ToolBar navigations={manageStudentToolbar} />
        <Switch>
          <Route path='/students/upload' component={UploadFileArea}/>
          <Route path='/students' component={StudentAccounts} />
        </Switch>
      </div>
    );
  }
}

export default ManageStudents;