import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import ToolBar from '../../../components/ToolBar/ToolBar';
import UploadFileArea from '../UploadFileArea/UploadFileArea';
import { connect } from 'react-redux';
import { manageStudentToolbar } from '../../../utils/navigations';
import classes from './ManageStudents.module.css';
import StudentAccounts from '../StudentAccounts/StudentAccounts';
import { fetchStudentAccounts } from '../../../store/actions';

class ManageStudents extends Component {
  render() {
    return (
      <div className={classes.ManageStudents}>
        <ToolBar navigations={manageStudentToolbar} />
        <Switch>
          <Route path='/students/upload' render={() => <UploadFileArea url="/api/Students/Upload" refresh={this.props.onRefresh} />} />
          <Route path='/students' component={StudentAccounts} />
        </Switch>
      </div>
    );
  }
}

const mapDisPatchToProps = dispatch => {
  return {
    onRefresh: () => dispatch(fetchStudentAccounts())
  }
}

export default connect(null, mapDisPatchToProps)(ManageStudents);