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

export const signInSuccesful = (username, role, id) => {
  return {
    type: actionTypes.SIGN_IN_SUCCESSFUL,
    username,
    role,
    id
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
      dispatch(signInSuccesful(userInfo.username, userInfo.role, userInfo.id));
    }).catch(err => {
      dispatch(signInFailed("Authentication Failed"));
    })
  }
}

export const initSignOut = () => {
  return dispatch => {
    //remove all cookies
    const allCookies = cookies.getAll();
    for (let cookieName in allCookies) {
      cookies.remove(cookieName,  { path: '/' });
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
      dispatch(signInSuccesful(userInfo.username, userInfo.role, userInfo.id));
    }
  }
}
