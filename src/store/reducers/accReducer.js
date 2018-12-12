import * as actionTypes from '../actions/actionTypes';
import updateObject from '../../utils/updateObject';

const initialState = {
  error: null,
  loadingStudent: false,
  loadingLecturer: false,
  studentAccounts: [],
  lecturerAccounts: [],
  totalStudents: 0,
  totalLecturers: 0,
}

const reducer = ( state =  initialState, action) => {
  switch (action.type) {
    case actionTypes.START_FETCHING_STUDENT_ACC:
      return updateObject(state, {loadingStudent: true, error: null});
      
    case actionTypes.START_FETCHING_LECTURER_ACC:
      return updateObject(state, {loadingLecturer: true, error: null});

    case actionTypes.FETCH_STUDENT_SUCCESSFUL:
      return updateObject(state, {
        loadingStudent: false, 
        studentAccounts: action.accounts, 
        totalStudents: action.total
      });

    case actionTypes.FETCH_LECTURER_SUCCESSFUL:
      return updateObject(state, {
        loadingLecturer: false, 
        lecturerAccounts: action.accounts, 
        totalLecturers: action.total
      });

    case actionTypes.FETCH_ACC_FAILED:
      return updateObject(state, {loadingLecturer: false, loadingStudent: false, error: action.error});
 
    case actionTypes.REMOVE_ACC_ERROR:
      return updateObject(state, {error: null});

    default:
      return state;
  }
}

export default reducer;