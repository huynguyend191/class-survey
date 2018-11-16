import React, { Component } from 'react';
import { Route, Redirect, withRouter, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Dashboard from './containers/Dashboard/Dashboard';
import SignIn from './containers/Authentication/SignIn/SignIn';
import SignOut from './containers/Authentication/SignOut/SignOut';
import * as actions from './store/actions';

class App extends Component {
  
  componentDidMount() {
    //try auto sign if cookies existing
    this.props.tryAutoSignIn();
  }

  render() {

    //default routes
    let routes = (
      <Switch>
        <Route path="/signin" component={SignIn} />
        <Redirect to="/signin" />
      </Switch>
    )

    // routes when user signed in
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/signin" component={SignIn} />
          <Route path="/signout" component={SignOut} />
          <Route path="/" component={Dashboard} />
          <Redirect to="/" />
        </Switch>
      )
    }
    return (
      <div>
        {routes}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated : state.authReducer.isAuthenticated
  }
}

const mapDispatchToProps =  dispatch => {
  return {
    tryAutoSignIn: () => dispatch(actions.checkSignInState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

