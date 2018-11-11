import * as actionTypes from '../actionTypes';

export const startFetching = () => {
  return {
    type: actionTypes.START_FETCHING
  }
};

export const fetchStudentSuccessful = (accounts, total) => {
  return {
    type: actionTypes.FETCH_STUDENT_SUCCESSFUL,
    accounts,
    total
  }
};

export const fetchStudentFailed = (error) => {
  return {
    type: actionTypes.FETCH_STUDENT_FAILED,
    error
  }
};

export const initFetchStudentAccounts = () => {
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
    setTimeout(() => {dispatch(fetchStudentSuccessful(accounts, total))}, 2*1000);
  }
};

export const fetchLecturerSuccessful = (accounts, total) => {
  return {
    type: actionTypes.FETCH_LECTURER_SUCCESSFUL,
    accounts,
    total
  }
};

export const fetchLecturerFailed = (error) => {
  return {
    type: actionTypes.FETCH_LECTURER_FAILED,
    error
  }
};

export const initFetchLecturerAccounts = () => {
  const accounts = [
    {
      username: 'thanhld',
      fullname: 'Lê Đình Thanh',
      VNUemail: 'thanhld@vnu.edu.vn',
    },
    {
      username: 'tunghx',
      fullname: 'Hoàng Xuân Tùng',
      VNUemail: 'tunghx@vnu.edu.vn',
    }
  ];
  const total = 30;
  return dispatch => {
    dispatch(startFetching());
    setTimeout(() => {dispatch(fetchLecturerSuccessful(accounts, total))}, 2*1000);
  }
}