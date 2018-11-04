import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import SideBar from '../../components/SideBar/SideBar';
import { adminSideBar } from '../../utils/navigations';
import classes from './Dashboard.module.css';
import ManageStudents from '../ManageStudents/ManageStudents';
import ManageLecturers from '../ManageLecturers/ManageLecturers';
import ManageSurveys from '../ManageSurveys/ManageSurveys';

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
        break;
      case ('lecturer'):
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