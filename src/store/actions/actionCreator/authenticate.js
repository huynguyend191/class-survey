import axios from '../../../utils/axiosConfig';
import * as actionTypes from '../actionTypes';
import _ from 'lodash';
import Cookies from 'universal-cookie';
import decodeCookie from '../../../utils/decodeCookie';
const cookies = new Cookies();

export const startSignIn = () => {
  return {
    type: actionTypes.START_SIGN_IN
  }
}

export const removeAuthError = () => {
  return {
    type: actionTypes.REMOVE_AUTH_ERROR
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
    axios.post('/api/Users/Login', loginData)
    .then(res => {
      const userInfo = decodeCookie();
      dispatch(signInSuccesful(userInfo.username, userInfo.role));
    }).catch(err => {
      console.log(err)
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
      const userInfo = decodeCookie();
      console.log(userInfo);
      dispatch(signInSuccesful(userInfo.username, userInfo.role));
    }
  }
}
