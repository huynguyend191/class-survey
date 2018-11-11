import * as actionTypes from '../actions/actionTypes';
import updateObject from '../../utils/updateObject';

const initialState = {
  error: null,
  loading: false,
  studentAccounts: [],
  totalStudents: 0
}

const reducer = ( state =  initialState, action) => {
  switch (action.type) {
    case actionTypes.START_FETCHING:
      return updateObject(state, {loading: true});
    case actionTypes.FETCH_SUCCESSFUL:
      return updateObject(state, {loading: false, studentAccounts: action.accounts, totalStudents: action.total});
    case actionTypes.FETCH_FAILED:
      return updateObject(state, {loading: false, error: action.error});
    default:
      return state;
  }
}

export default reducer;