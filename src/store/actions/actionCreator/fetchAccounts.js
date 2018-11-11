import * as actionTypes from '../actionTypes';

export const startFetching = () => {
  return {
    type: actionTypes.START_FETCHING
  }
}

export const fetchSuccessful = (accounts, total) => {
  return {
    type: actionTypes.FETCH_SUCCESSFUL,
    accounts,
    total
  }
}

export const fetchFailed = (error) => {
  return {
    type: actionTypes.FETCH_FAILED,
    error
  }
}

export const initFetchAccounts = () => {
  const accounts = [
    {
      username: 16021391,
      fullname: 'Nguyễn Đắc Huy',
      VNUemail: '16021391@gmail.com',
      year: 'QH-2016-I/CQ-C-CLC'
    },
    {
      username: 16021392,
      fullname: 'Nani hello aloha',
      VNUemail: '16021392@gmail.com',
      year: 'QH-2016-I/CQ-C-CLC'
    }
  ];
  const total = 30;
  return dispatch => {
    dispatch(startFetching());
    setTimeout(() => {dispatch(fetchSuccessful(accounts, total))}, 2*1000);
  }
}