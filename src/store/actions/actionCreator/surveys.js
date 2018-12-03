import * as actionTypes from '../actionTypes';
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

export const fetchSurveys = () => {
  return dispatch => {
    dispatch(startFetchingSurvey());
    axios.get('/api/Classes/List', {data: {}})
    .then(result => {
      const surveys = result.data;
      dispatch(fetchSurveySuccessful(surveys, surveys.length));
      // console.log(surveys);
    })
    .catch(error => {
      dispatch(fetchSurveyFailed('Fetch Survey Failed'));
    })
  }
};

export const deleteSurvey = (id) => {
  return dispatch => {
    dispatch(startFetchingSurvey());
    axios.delete('/api/Classes/' + id).then(result => {
      dispatch(fetchSurveys());
    })
    .catch(error => {
      dispatch(fetchSurveyFailed('Delete Survey Failed'));
    })
  }
}