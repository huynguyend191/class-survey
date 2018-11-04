import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import ToolBar from '../../components/ToolBar/ToolBar';
import UploadFileArea from '../../containers/UploadFileArea/UploadFileArea';
import { manageStudentToolbar } from '../../utils/navigations';
import classes from './ManageStudents.module.css';
import AccountList from '../AccountList/AccountList';

class ManageStudents extends Component {
  render() {
    return (
      <div className={classes.ManageStudents}>
        <ToolBar navigations={manageStudentToolbar} />
        <Switch>
          <Route path='/students/upload' component={UploadFileArea}/>
          <Route path='/students' exact component={AccountList} />
        </Switch>
      </div>
    );
  }
}

export default ManageStudents;