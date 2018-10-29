import axios from '../../../utils/axiosConfig';
import * as actionTypes from '../actionTypes';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export const signInSuccesful = () => {
  return {
    type: actionTypes.SIGN_IN_SUCCESSFUL
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
    axios.post('/user/login', loginData)
    .then(res => {
      dispatch(signInSuccesful());
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
