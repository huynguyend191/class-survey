import React, { Component } from 'react';
import { Route, Redirect, withRouter, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import UploadFileArea from './containers/UploadFileArea/UploadFileArea';
import Login from './containers/Login/Login';

class App extends Component {
 
  render() {
    let routes = (
      <Switch>
          <Route path="/login" component={Login} />
          <Route path="/" exact component={UploadFileArea} />
          <Redirect to="/" />
      </Switch>
    )
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/" exact component={UploadFileArea} />
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

export default withRouter(connect(mapStateToProps)(App));

