import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from '../../utils/axiosConfig';

class Login extends Component {

  state = {
    isAuthenticated: false,
    username: null,
    password: null
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
    axios.post('/user/login', loginData)
    .then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    })

  }

  render() {
    let redirect = null;
    if (this.state.isAuthenticated) {
      redirect = <Redirect to="/" />
    }
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
        {redirect}
        {form}
      </div>
    );
  }
}

export default Login;