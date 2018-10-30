import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';

class SignOut extends Component {
  componentDidMount() {
    this.props.onSignOut();
  }

  render() {
    return (
      <Redirect to="/signin" />
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSignOut: () => dispatch(actions.initSignOut())
  };
}

export default connect(null, mapDispatchToProps)(SignOut);
