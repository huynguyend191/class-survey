import * as actionTypes from '../actions/actionTypes';
import updateObject from '../../utils/updateObject';

const initialState = {
  error: null,
  loading: false,
  surveys: [],
  totalSurvey: 0,
  currentPage: 0
}

const reducer = ( state =  initialState, action) => {
  switch (action.type) {
    case actionTypes.START_FETCHING_SURVEY:
      return updateObject(state, {loading: true, error: null});

    case actionTypes.FETCH_SURVEY_SUCCESSFUL:
      return updateObject(state, {
        loading: false, 
        surveys: action.surveys, 
        totalSurvey: action.total
      });

    case actionTypes.FETCH_SURVEY_FAILED:
      return updateObject(state, {loading: false, error: action.error});
    
    case actionTypes.UPDATE_SURVEY_PAGE:
      return updateObject(state, {currentPage: action.page});
    
    case actionTypes.REMOVE_SURVEY_ERROR:
      return updateObject(state, {error: null});

    default:
      return state;
  }
}

export default reducer;