import * as actionTypes from '../actionTypes';
import axios from '../../../utils/axiosConfig';
export const startFetchingStudentAcc = () => {
  return {
    type: actionTypes.START_FETCHING_STUDENT_ACC
  }
};
export const startFetchingLecturerAcc = () => {
  return {
    type: actionTypes.START_FETCHING_LECTURER_ACC
  }
};
export const removeStudentError = () => {
  return {
    type: actionTypes.REMOVE_STUDENT_ERROR
  }
};
export const removeLecturerError = () => {
  return {
    type: actionTypes.REMOVE_LECTURER_ERROR
  }
};

export const fetchStudentSuccessful = (accounts, total) => {
  return {
    type: actionTypes.FETCH_STUDENT_SUCCESSFUL,
    accounts,
    total
  }
};

export const fetchLecturerSuccessful = (accounts, total) => {
  return {
    type: actionTypes.FETCH_LECTURER_SUCCESSFUL,
    accounts,
    total
  }
};

export const fetchStudentFailed = (error) => {
  return {
    type: actionTypes.FETCH_STUDENT_FAILED,
    error
  }
};

export const fetchLecturerFailed = (error) => {
  return {
    type: actionTypes.FETCH_LECTURER_FAILED,
    error
  }
};


export const fetchStudentAccounts = () => {
  return dispatch => {
    dispatch(startFetchingStudentAcc());
    axios.get('/api/Students/List', {data:{}})
    .then(result => {
      let accounts = result.data;
      dispatch(fetchStudentSuccessful(accounts, accounts.length));
    })
    .catch(error => {
      dispatch(fetchStudentFailed("Fetched Students Failed"));
    })
  }
};

export const fetchLecturerAccounts = () => {
  return dispatch => {
    dispatch(startFetchingLecturerAcc());
    axios.get('/api/Lecturers/List', {data:{}})
    .then(result => {
      let accounts = result.data;
      dispatch(fetchLecturerSuccessful(accounts, accounts.length));
    })
    .catch(error => {
      dispatch(fetchLecturerFailed("Fetched Lecturers Failed"));
    })
  }
};

export const editStudent = (id, form) => {
  return dispatch => {
    dispatch(startFetchingStudentAcc());
    if(form.Password !== '') {
      axios.put('/api/Users/' + id, form)
    }
    axios.put('/api/Students/' + id, form)
    .then(result => {
      dispatch(fetchStudentAccounts())
    })
    .catch(error => {
      dispatch(fetchStudentFailed('Edit Student Failed'))
    })
  }
};

export const editLecturer = (id, form) => {
  return dispatch => {
    dispatch(startFetchingLecturerAcc());
    if(form.Password !== '') {
      axios.put('/api/Users/' + id, form)
    }
    axios.put('/api/Lecturers/' + id, form)
    .then(result => {
      dispatch(fetchLecturerAccounts())
    })
    .catch(error => {
      dispatch(fetchLecturerFailed('Edit Lecturer Failed'))
    })
  }
};

export const deleteStudent = (id) => {
  return dispatch => {
    dispatch(startFetchingStudentAcc());
    axios.delete('/api/Students/' + id)
    .then(result => {
      dispatch(fetchStudentAccounts());
    })
    .catch(error => {
      dispatch(fetchStudentFailed('Delete Student Failed'))
    })
  }
};

export const deleteLecturer = (id) => {
  return dispatch => {
    dispatch(startFetchingLecturerAcc());
    axios.delete('/api/Lecturers/' + id)
    .then(result => {
      dispatch(fetchLecturerAccounts());
    })
    .catch(error => {
      dispatch(fetchLecturerFailed('Delete Lecturer Failed'))
    })
  }
};

export const addStudent = (form) => {
  return dispatch => {
    dispatch(startFetchingStudentAcc());
    axios.post('/api/Students', form)
    .then(result => {
      dispatch(fetchStudentAccounts())
    })
    .catch(error => {
      dispatch(fetchStudentFailed('Add Student Failed'))
    })
  }
};

export const addLecturer = (form) => {
  return dispatch => {
    dispatch(startFetchingLecturerAcc());
    console.log(form)
    axios.post('/api/Lecturers', form)
    .then(result => {
      dispatch(fetchLecturerAccounts())
    })
    .catch(error => {
      dispatch(fetchLecturerFailed('Add Lecturer Failed'))
    })
  }
};

export const searchStudent = (keyword, type) => {
  return dispatch => {
    dispatch(startFetchingStudentAcc());
    axios.get(`api/Students/List?${type}=${keyword}`,{data: {}})
    .then(result => {
      let accounts = result.data;
      dispatch(fetchStudentSuccessful(accounts, accounts.length));
    })
    .catch(error => {
      dispatch(fetchStudentFailed('Search Student Failed'))
    })
  }
};

export const searchLecturer = (keyword, type) => {
  return dispatch => {
    dispatch(startFetchingLecturerAcc());
    axios.get(`api/Lecturers/List?${type}=${keyword}`,{data: {}})
    .then(result => {
      let accounts = result.data;
      dispatch(fetchLecturerSuccessful(accounts, accounts.length));
    })
    .catch(error => {
      dispatch(fetchLecturerFailed('Search Lecturer Failed'))
    })
  }
};