import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import NavigationBar from '../../containers/NavigationBar/NavigationBar';
import SideBar from '../../components/SideBar/SideBar';
import { adminSideBar, studentSideBar, lecturerSideBar } from '../../utils/navigations';
import classes from './Dashboard.module.css';
import ManageStudents from '../Admin/ManageStudents/ManageStudents';
import ManageLecturers from '../Admin/ManageLecturers/ManageLecturers';
import ManageSurveys from '../Admin/ManageSurveys/ManageSurveys';
import StudentClassList from '../Students/StudentClassList/StudentClassList';
import LecturerClassList from '../Lecturers/LecturerClassList/LecturerClassList';

class Dashboard extends Component {
  render() {
    let routes = null;
    let navigations = null;
    switch (this.props.role) {
      case ('admin'):
        routes = (
          <Switch>
            <Route path='/students' component={ManageStudents} />
            <Route path='/lecturers' component={ManageLecturers} />
            <Route path='/surveys' component={ManageSurveys} />
          </Switch>
        );
        navigations = adminSideBar;
        break;
      case ('student'):
        routes = (
          <Switch>
            <Route path='/' component={StudentClassList} />
          </Switch>
        );     
        navigations = studentSideBar;
        break;
      case ('lecturer'):
      routes = (
        <Switch>
          <Route path='/' component={LecturerClassList} />          
        </Switch>
      );  
        navigations = lecturerSideBar;          
        break;
      default: routes = null;
    }
    return (
      <div>
        <NavigationBar username={this.props.username} />
        <div className={classes.container}>
          <SideBar navigations={navigations} />
          {routes}
        </div>
        <div className={classes.footer}></div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    username: state.authReducer.username,
    role: state.authReducer.role
  };
}

export default connect(mapStateToProps)(Dashboard);