import axios from '../../../utils/axiosConfig';
import * as actionTypes from '../actionTypes';

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
