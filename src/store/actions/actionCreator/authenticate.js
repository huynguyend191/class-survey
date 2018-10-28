import axios from '../../../utils/axiosConfig';
import * as actionTypes from '../actionTypes';

export const loginSuccesful = () => {
  return {
    type: actionTypes.LOGIN_SUCCESSFUL
  }
}

export const loginFailed = (error) => {
  return {
    type: actionTypes.LOGIN_FAILED,
    error
  }
}

export const initLogin = (loginData) => {
  return dispatch => {
    axios.post('/user/login', loginData)
    .then(res => {
      dispatch(loginSuccesful());
    }).catch(err => {
      dispatch(loginFailed(err.message));
    })
  }
}
