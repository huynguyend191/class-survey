import * as actionTypes from '../actions/actionTypes';
import updateObject from '../../utils/updateObject';

const initialState = {
  error: null,
  loadingSurvey: false,
  surveys: [],
  totalSurveys: 0,
}

const reducer = ( state =  initialState, action) => {
  switch (action.type) {
    case actionTypes.START_FETCHING_SURVEY:
      return updateObject(state, {loadingSurvey: true, error: null});

    case actionTypes.FETCH_SURVEY_SUCCESSFUL:
      return updateObject(state, {
        loadingSurvey: false, 
        surveys: action.surveys, 
        totalSurveys: action.total
      });

    case actionTypes.FETCH_SURVEY_FAILED:
      return updateObject(state, {loadingSurvey: false, error: action.error});
     
    case actionTypes.REMOVE_SURVEY_ERROR:
      return updateObject(state, {error: null});

    default:
      return state;
  }
}

export default reducer;