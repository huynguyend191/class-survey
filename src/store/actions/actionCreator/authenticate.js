import axios from '../../../utils/axiosConfig';
import * as actionTypes from '../actionTypes';
import _ from 'lodash';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export const startSignIn = () => {
  return {
    type: actionTypes.START_SIGN_IN
  }
}

export const signInSuccesful = (userInfo) => {
  return {
    type: actionTypes.SIGN_IN_SUCCESSFUL,
    userInfo
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
      dispatch(signInSuccesful());
    }).catch(err => {
      dispatch(signInFailed(err.message));
    })
  }
}

export const initSignOut = () => {
  return async dispatch => {
    //remove all cookies
    const allCookies = await cookies.getAll();
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
