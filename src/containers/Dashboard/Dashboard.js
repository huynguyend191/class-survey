import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import UploadFileArea from '../UploadFileArea/UploadFileArea';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import SignOut from '../../containers/SignOut/SignOut';
import ListAccount from '../ListAccount/ListAccount';
import SideBar from '../../components/SideBar/SideBar';
import ToolBar from '../../components/ToolBar/ToolBar';


import classes from './Dashboard.module.css';

class Dashboard extends Component {
  
  componentDidMount() {
    this.props.history.replace('/list');
  }

  render() {
    let routes = null;
    switch (this.props.role) {
      case ('admin'):
        routes = (
          <Switch>
            <Route path='/upload' component={UploadFileArea} />
            <Route path='/list' component={ListAccount} />
            <Route path='/signout' component={SignOut} />
          </Switch>
        );
        break;
      case ('student'):
        break;
      case ('lecturer'):
        break;
      default: routes = null;
    }
    return (
      <div>
        <NavigationBar username={this.props.username}/>
        <div className={classes.container}>
          <SideBar />    
          <div className={classes.MainContent}>
            <ToolBar />
            {routes}
          </div>
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