import * as actionTypes from '../actions/actionTypes';
import updateObject from '../../utils/updateObject';

const initialState = {
  surveyError: null,
  loadingSurvey: false,
  surveys: [],
  totalSurveys: 0,

  surveyVersions: [],
  versionError: null,
  loadingVersion: false
}

const reducer = ( state =  initialState, action) => {
  switch (action.type) {
    //Surveys List
    case actionTypes.START_FETCHING_SURVEY:
      return updateObject(state, {loadingSurvey: true, surveyError: null});

    case actionTypes.FETCH_SURVEY_SUCCESSFUL:
      return updateObject(state, {
        loadingSurvey: false, 
        surveys: action.surveys, 
        totalSurveys: action.total
      });

    case actionTypes.FETCH_SURVEY_FAILED:
      return updateObject(state, {loadingSurvey: false, surveyError: action.error});
     
    case actionTypes.REMOVE_SURVEY_ERROR:
      return updateObject(state, {surveyError: null, loadingSurvey: false});

    //Survey Versions
    case actionTypes.START_FETCHING_SURVEY_VER:
      return updateObject(state, {loadingVersion: true, versionError: null});
    
    case actionTypes.FETCH_SURVEY_VER_SUCCESSFUL:
      return updateObject(state, {loadingVersion: false, surveyVersions: action.surveyVersions});

    case actionTypes.FETCH_SURVEY_VER_FAILED:
      return updateObject(state, {loadingVersion: false, versionError: action.error})

    case actionTypes.REMOVE_SURVEY_VER_ERROR:
      return updateObject(state, {loadingVersion: false, versionError: null})

    default:
      return state;
  }
}

export default reducer;