import axios from '../../../utils/axiosConfig';
import * as actionTypes from '../actionTypes';
import _ from 'lodash';
import Cookies from 'universal-cookie';
import jwtDecode from 'jwt-decode';
const cookies = new Cookies();

export const startSignIn = () => {
  return {
    type: actionTypes.START_SIGN_IN
  }
}

export const signInSuccesful = (username, role) => {
  return {
    type: actionTypes.SIGN_IN_SUCCESSFUL,
    username,
    role
  }
}

export const signInFailed = (error) => {
  return {
    type: actionTypes.SIGN_IN_FAILED,
    error
  }
}

export const signOut = () => {
  return {
    type: actionTypes.SIGN_OUT
  }
}

export const initSignIn = (loginData) => {
  return dispatch => {
    dispatch(startSignIn());
    axios.post('/user/login', loginData)
    .then(res => {
      const allCookies = cookies.getAll();
      let token;
      for (let cookieName in allCookies) {
        token = cookies.get(cookieName);
      }
      const decoded = jwtDecode(token);
      const userInfo = {
        username: decoded.username,
        role: decoded.role
      }
      dispatch(signInSuccesful(userInfo.username, userInfo.role));
    }).catch(err => {
      dispatch(signInFailed(err.message));
    })
  }
}

export const initSignOut = () => {
  return dispatch => {
    //remove all cookies
    const allCookies = cookies.getAll();
    for (let cookieName in allCookies) {
      cookies.remove(cookieName);
    }
    //update state
    dispatch(signOut());
  }
}

export const checkSignInState = () => {
  return dispatch => {
    //check if cookies exist to maintain state
    const allCookies = cookies.getAll();
    if (_.isEmpty(allCookies)){
      dispatch(signOut());
    } else {
      dispatch(signInSuccesful());
    }
  }
}
