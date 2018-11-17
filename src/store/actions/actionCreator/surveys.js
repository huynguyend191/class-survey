import * as actionTypes from '../actionTypes';
import uuidv4 from 'uuid';
import axios from '../../../utils/axiosConfig';

export const startFetchingSurvey = () => {
  return {
    type: actionTypes.START_FETCHING_SURVEY
  }
};

export const removeSurveyError = () => {
  return {
    type: actionTypes.REMOVE_SURVEY_ERROR
  }
};

export const fetchSurveySuccessful = (surveys, total) => {
  return {
    type: actionTypes.FETCH_SURVEY_SUCCESSFUL,
    surveys,
    total
  }
};

export const fetchSurveyFailed = (error) => {
  return {
    type: actionTypes.FETCH_SURVEY_FAILED,
    error
  }
};

export const updateSurveyPage = (page) => {
  return {
    type: actionTypes.UPDATE_SURVEY_PAGE,
    page
  }
};

export const fetchSurveys = (page) => {
  return dispatch => {
    dispatch(updateSurveyPage(page));
    dispatch(startFetchingSurvey());
    axios.get('/surveys')
    .then(result => {
      let surveys;
      let total;
      dispatch(fetchSurveySuccessful(surveys, total));
    })
    .catch(error => {
      dispatch(fetchSurveyFailed(error.message));
    })
  }
};