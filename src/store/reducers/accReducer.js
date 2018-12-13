import * as actionTypes from '../actions/actionTypes';
import updateObject from '../../utils/updateObject';

const initialState = {
  studentError: null,
  lecturerError: null,
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
      return updateObject(state, {loadingStudent: true, studentError: null});
      
    case actionTypes.START_FETCHING_LECTURER_ACC:
      return updateObject(state, {loadingLecturer: true, lecturerError: null});

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

    case actionTypes.FETCH_STUDENT_FAILED:
      return updateObject(state, {loadingStudent: false, studentError: action.error});
    
      case actionTypes.FETCH_LECTURER_FAILED:
      return updateObject(state, {loadingStudent: false, lecturerError: action.error});
 
    case actionTypes.REMOVE_STUDENT_ERROR:
      return updateObject(state, {studentError: null, loadingStudent: false});

    case actionTypes.REMOVE_LECTURER_ERROR:
      return updateObject(state, {lecturerError: null, loadingLecturer: false});
      
    default:
      return state;
  }
}

export default reducer;