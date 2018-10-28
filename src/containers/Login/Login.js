import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';

class Login extends Component {

  state = {
    username: null,
    password: null
  }

  componentDidMount() {
    if (this.props.isAuthenticated) {
      this.props.history.push('/');
    }
  }

  onInputChangeHandler = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  onLoginHandler = (event) => {
    event.preventDefault();
    const loginData = {
      username: this.state.username,
      password: this.state.password,
    };
    this.props.onLogin(loginData);
   
  }

  render() {
    if (this.props.isAuthenticated) {
      this.props.history.push('/');
    }
    let error = <p>{this.props.error}</p>
    const form = (
      <form onSubmit={this.onLoginHandler}>
        <label>Username:</label><br></br>
        <input id="username" type="text" onChange={this.onInputChangeHandler}/><br></br>
        <label>Password:</label><br></br>
        <input id="password" type="password" onChange={this.onInputChangeHandler}/><br></br>
        <button>Login</button>
      </form>
    )
    return (
      <div>
        {form}
        {error}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.authReducer.isAuthenticated,
    error: state.authReducer.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogin: (loginData) => dispatch(actions.initLogin(loginData))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);