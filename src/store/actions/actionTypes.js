//Authentication actions
export const SIGN_IN_SUCCESSFUL = 'SIGN_IN_SUCCESSFUL';
export const SIGN_IN_FAILED = 'SIGN_IN_FAILED';
export const SIGN_OUT = 'SIGN_OUT';
export const START_SIGN_IN = 'START_SIGN_IN';
export const REMOVE_AUTH_ERROR = 'REMOVE_AUTH_ERROR';

//Manage accounts actions
  //handle fetch accs
export const START_FETCHING = 'START_FETCHING';
export const FETCH_STUDENT_SUCCESSFUL = 'FETCH_STUDENT_SUCCESSFUL';
export const FETCH_LECTURER_SUCCESSFUL = 'FETCH_LECTURER_SUCCESSFUL';
export const FETCH_FAILED = 'FETCH_FAILED';
  //handle page change
export const UPDATE_STUDENT_PAGE = 'UPDATE_STUDENT_PAGE';
export const UPDATE_LECTURER_PAGE = 'UPDATE_LECTURER_PAGE';
  //handle edit, del account
export const EDIT_STUDENT = 'EDIT_STUDENT';
export const EDIT_LECTURER = 'EDIT_LECTURER';
export const DELETE_STUDENT = 'DELETE_STUDENT';
export const DELETE_LECTURER = 'DELETE_LECTURER';
export const REMOVE_ACC_ERROR = 'REMOVE_ACC_ERROR';