import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, NavLink } from 'react-router-dom';

import UploadFileArea from '../UploadFileArea/UploadFileArea';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import SignOut from '../../containers/SignOut/SignOut';
import ListAccount from '../ListAccount/ListAccount';


class Dashboard extends Component {
  
  componentDidMount() {
    this.props.history.push('/list');
  }

  render() {
    let routes = null;
    switch (this.props.role) {
      case ('admin'):
        routes = (
          <Switch>
            <Route path='/upload' component={UploadFileArea} />
            <Route path='/list' component={ListAccount} />
            <Route path="/signout" component={SignOut} />
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
        <NavLink to='/upload'>Upload</NavLink>
        <NavLink to='/list'>List</NavLink>        
        {routes}
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