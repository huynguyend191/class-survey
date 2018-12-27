import * as actionTypes from '../actionTypes';
import axios from '../../../utils/axiosConfig';
import { invertObjectClientToServer } from '../../../utils/invertObject';
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

export const searchSurveys = (keyword, type) => {
  return dispatch => {
    dispatch(startFetchingSurvey());
    axios.get(`/api/Classes/List?${type}=${keyword}`, {data: {}})
    .then(result => {
      const surveys = result.data;
      dispatch(fetchSurveySuccessful(surveys, surveys.length));
    })
    .catch(error => {
      dispatch(fetchSurveyFailed('Fetch Survey Failed'));
    })
  }
}

export const editSurvey = (id, form) => {
  return dispatch => {
    dispatch(startFetchingSurvey());
    axios.put('/api/Classes/' + id, form)
    .then(result =>
      dispatch(fetchSurveys())
    )
    .catch(error => {
      dispatch(fetchSurveyFailed('Edit Survey Failed'));
    })
  }
}

export const startFetchingSurveyVer = () => {
  return {
    type: actionTypes.START_FETCHING_SURVEY_VER
  }
}

export const removeSurveyVerError = () => {
  return {
    type: actionTypes.REMOVE_SURVEY_VER_ERROR
  }
}

export const fetchSurveyVerSuccessful = (surveyVersions) => {
  return {
    type: actionTypes.FETCH_SURVEY_VER_SUCCESSFUL,
    surveyVersions
  }
}

export const fetchSurveyVerFailed = (error) => {
  return {
    type: actionTypes.FETCH_SURVEY_VER_FAILED,
    error
  }
}

export const fetchSurveyVer = () => {
  return dispatch => {
    dispatch(startFetchingSurveyVer());
    axios.get('/api/VersionSurveys/List', {data: {}})
    .then(result => {
      const surveyVersions = result.data;
      dispatch(fetchSurveyVerSuccessful(surveyVersions));
    })
    .catch(error => {
      dispatch(fetchSurveyVerFailed('Fetch Survey Versions Failed'));
    })
  }
}

export const createSurveyVer = (formData) => {
  return dispatch => {
    dispatch(startFetchingSurveyVer());
    const surveyForm = {
      Content: JSON.stringify(invertObjectClientToServer(formData)),
      Version: "1"
    }
    axios.post('/api/VersionSurveys', surveyForm)
    .then(result => {
      dispatch(fetchSurveyVer());
    })
    .catch(error => {
      dispatch(fetchSurveyVerFailed('Create Survey Version Failed'));
    })
  }
}

export const deleteSurveyVer = (id) => {
  return dispatch => {
    dispatch(startFetchingSurveyVer());
    axios.delete('/api/VersionSurveys/' + id).then(result => {
      dispatch(fetchSurveyVer());
    })
    .catch(error => {
      dispatch(fetchSurveyVerFailed('Delete Survey Failed'));
    })
  }
}