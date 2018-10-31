import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../store/actions';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import classes from './SignIn.module.css';

class SignIn extends Component {

  state = {
    username: '',
    password: '',
    usernameError: false,
    passwordError: false
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

  checkUsernameValidity = () => {
    let isValid = true;
    let username = this.state.username;
    if (username.trim() === '') {
      isValid = false;
    }
    this.setState({usernameError: !isValid});
  }

  checkPasswordValidity = () => {
    let isValid = true;
    let password = this.state.password;
    if (password.trim() === '') {
      isValid = false;
    }
    this.setState({passwordError: !isValid});
  }

  render() {
    let loginRedirect = null;
    if (this.props.isAuthenticated) {
      loginRedirect = <Redirect to="/" />
    }
    let error = null;
    if (this.props.error) {
      error = (
        <p className={classes.ErrorMsg}>
          {this.props.error}<br></br>
          Please try again
        </p>
      )
    }
    let header = (
      <p className={classes.Header}>CLASS SURVEY</p>
    )
    const form = (
      <form onSubmit={this.onLoginHandler} className={classes.SignInForm}>
        <TextField
            fullWidth
            id="username"
            label="Username"
            placeholder="Please enter username"
            margin="normal"
            helperText= {this.state.usernameError ? 'Username cannot be emty' : null}
            onChange={this.onInputChangeHandler}
            value={this.state.username}
            onBlur={this.checkUsernameValidity}
            error={this.state.usernameError}
          />
        <TextField
            fullWidth
            type="password"
            id="password"
            label="Password"
            placeholder="Please enter password"
            margin="normal"
            helperText= {this.state.passwordError ? 'Password cannot be emty' : null}
            onChange={this.onInputChangeHandler}
            value={this.state.password}
            onBlur={this.checkPasswordValidity}
            error={this.state.passwordError}
          />
        <Button 
          className={classes.SignInButton}
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={this.props.isLoading}
        >
          {this.props.isLoading ? <CircularProgress size={20}/> : 'SIGN IN'}
        </Button>
      </form>
    )
    return (
      <div className={classes.SignIn}>
        {loginRedirect}
        <Paper className={classes.Paper}>
          {header}
          {form}
          {error}
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.authReducer.isAuthenticated,
    error: state.authReducer.error,
    isLoading: state.authReducer.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogin: (loginData) => dispatch(actions.initSignIn(loginData))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);