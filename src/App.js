import React, { Component } from 'react';
import { Route, Redirect, withRouter, Switch } from 'react-router-dom';
import UploadFileArea from './containers/UploadFileArea';
import Login from './containers/Login';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/" exact component={UploadFileArea} />
          <Redirect to="/" />
      </Switch>
      </div>
    );
  }
}

export default withRouter(App);
