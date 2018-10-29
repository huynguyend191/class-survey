import React, { Component } from 'react';
import { Route, Redirect, withRouter, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { withCookies }  from 'react-cookie';
import _ from 'lodash';
import UploadFileArea from './containers/UploadFileArea/UploadFileArea';
import SignIn from './containers/SignIn/SignIn';
import * as actions from './store/actions';

class App extends Component {
  
  componentDidMount() {
    if (_.isEmpty(this.props.cookies.cookies)) {
      console.log('No user')
    } else {
      this.props.autoSignIn();
    }
  }

  render() {
    let routes = (
      <Switch>
          <Route path="/signin" component={SignIn} />
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

const mapDispatchToProps =  dispatch => {
  return {
    autoSignIn : () => dispatch(actions.signInSuccesful())
  }
}

export default withCookies(withRouter(connect(mapStateToProps, mapDispatchToProps)(App)));

