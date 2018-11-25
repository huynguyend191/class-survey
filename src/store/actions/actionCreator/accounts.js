import * as actionTypes from '../actionTypes';
import axios from '../../../utils/axiosConfig';
export const startFetchingAcc = () => {
  return {
    type: actionTypes.START_FETCHING_ACC
  }
};

export const removeAccError = () => {
  return {
    type: actionTypes.REMOVE_ACC_ERROR
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

export const fetchAccFailed = (error) => {
  return {
    type: actionTypes.FETCH_ACC_FAILED,
    error
  }
};

export const updateStudentPage = (page) => {
  
  return {
    type: actionTypes.UPDATE_STUDENT_PAGE,
    page
  }
};

export const updateLecturerPage = (page) => {
  return {
    type: actionTypes.UPDATE_LECTURER_PAGE,
    page
  }
};

export const fetchStudentAccounts = () => {
  return dispatch => {
    dispatch(updateStudentPage(0));   
    dispatch(startFetchingAcc());
    axios.get('/api/Students/List', {data:{}})
    .then(result => {
      // console.log(result)
      let accounts = [];
      for(let index in result.data) {
        accounts.push({
          Id: result.data[index].Id,
          Username: result.data[index].Code,
          Name: result.data[index].Name,
          Vnumail: result.data[index].Vnumail,
          Class: result.data[index].Class
        })
      }
      
      dispatch(fetchStudentSuccessful(accounts, accounts.length));
    })
    .catch(error => {
      dispatch(fetchAccFailed("Fetched Students Failed"));
    })
  }
};

export const fetchLecturerAccounts = () => {
  return dispatch => {
    dispatch(updateLecturerPage(0));   
    dispatch(startFetchingAcc());
    axios.get('/api/Lecturers/List', {data:{}})
    .then(result => {
      let accounts = [];
      for(let index in result.data) {
        accounts.push({
          Id: result.data[index].Id,
          Username: result.data[index].Username,
          Name: result.data[index].Name,
          Vnumail: result.data[index].Vnumail
        })
      }
      dispatch(fetchLecturerSuccessful(accounts, accounts.length));
    })
    .catch(error => {
      dispatch(fetchAccFailed("Fetched Lecturers Failed"));
    })
  }
};

export const editStudent = (id, form) => {
  return dispatch => {
    console.log(form);

    dispatch(startFetchingAcc());
    axios.put('/api/Students/' + id, form)
    .then(result => {
      dispatch(fetchStudentAccounts(0))
    })
    .catch(error => {
      dispatch(fetchAccFailed('Edit Student Failed'))
    })
  }
};

export const editLecturer = (id, form) => {
  return dispatch => {
    dispatch(startFetchingAcc());
    axios.put('/api/Lecturers/' + id, form)
    .then(result => {
      dispatch(fetchLecturerAccounts())
    })
    .catch(error => {
      dispatch(fetchAccFailed('Edit Lecturer Failed'))
    })
  }
};

export const deleteStudent = (id) => {
  return dispatch => {
    dispatch(startFetchingAcc());
    axios.delete('/api/Students/' + id)
    .then(result => {
      dispatch(fetchStudentAccounts());
    })
    .catch(error => {
      dispatch(fetchAccFailed('Delete Student Failed'))
    })
  }
};

export const deleteLecturer = (id) => {
  return dispatch => {
    dispatch(startFetchingAcc());
    axios.delete('/api/Lecturers/' + id)
    .then(result => {
      dispatch(fetchLecturerAccounts());
    })
    .catch(error => {
      dispatch(fetchAccFailed('Delete Lecturer Failed'))
    })
  }
};

export const addStudent = (form) => {
  return dispatch => {
    dispatch(startFetchingAcc());    
    axios.post('/students', form)
    .then(result => {
      dispatch(fetchStudentAccounts(0))
    })
    .catch(error => {
      dispatch(fetchAccFailed('Add Student Failed'))
    })
  }
};

export const addLecturer = (form) => {
  return dispatch => {
    dispatch(startFetchingAcc());
    axios.post('/lecturers', form)
    .then(result => {
      dispatch(fetchStudentAccounts(0))
    })
    .catch(error => {
      dispatch(fetchAccFailed('Add Lecturer Failed'))
    })
  }
};

export const searchStudent = (keyword, type) => {
  return dispatch => {
    dispatch(startFetchingAcc());
    axios.get('/students')
    .then(result => {
      // dispatch(fetchStudentSuccessful())
    })
    .catch(error => {
      dispatch(fetchAccFailed('Search Student Failed'))
    })
  }
};

export const searchLecturer = (keyword, type) => {
  return dispatch => {
    dispatch(startFetchingAcc());
    // axios.get('/lecturers')
    // .then(result => {
    //   // dispatch(fetchLecturerSuccessful())
    // })
    // .catch(error => {
    //   dispatch(fetchAccFailed('Search Lec Failed'))
    // })

  }
};