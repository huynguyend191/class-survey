import React, { Component } from 'react';
import { Route, Redirect, withRouter, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';
import UploadFileArea from './containers/UploadFileArea/UploadFileArea';
import SignIn from './containers/SignIn/SignIn';
import * as actions from './store/actions';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

class App extends Component {
  
  componentDidMount() {
    //check if cookies exist to maintain state
    if (_.isEmpty(cookies.getAll())) {
      this.props.autoSignOut();
      // this.props.history.push('/signin');
    } else {
      this.props.autoSignIn();
    }
  }

  render() {
    //default routes
    let routes = (
      <Switch>
          <Route path="/signin" component={SignIn} />
          <Route path="/" exact component={UploadFileArea} />
          <Redirect to="/" />
      </Switch>
    )
    //routes when user signed in
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

const mapDispatchToProps =  dispatch => {
  return {
    autoSignIn : () => dispatch(actions.signInSuccesful()),
    autoSignOut: () => dispatch(actions.signOut()),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

