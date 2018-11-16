import * as actionTypes from '../actionTypes';
import uuidv4 from 'uuid';
import axios from '../../../utils/axiosConfig';

export const startFetching = () => {
  return {
    type: actionTypes.START_FETCHING
  }
};

export const removeAccError = () => {
  return {
    type: actionTypes.REMOVE_ACC_ERROR
  }
}

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

export const fetchFailed = (error) => {
  return {
    type: actionTypes.FETCH_FAILED,
    error
  }
};

export const updateStudentPage = (page) => {
  
  return {
    type: actionTypes.UPDATE_STUDENT_PAGE,
    page
  }
}

export const updateLecturerPage = (page) => {
  return {
    type: actionTypes.UPDATE_LECTURER_PAGE,
    page
  }
}

export const fetchStudentAccounts = (page) => {
  
  return dispatch => {
    dispatch(updateStudentPage(page));
    dispatch(startFetching());
    // axios.get('/students/')
    // .then(result => {
    //   let accounts;
    //   let total;
    //   dispatch(fetchStudentSuccessful(accounts, total))
    // })
    // .catch(error => {
    //   dispatch(fetchFailed(error.message))
    // })
    let accounts = [{
      id: uuidv4(),
      username: 'abc123',
      fullname: 'Yolo',
      VNUemail: 'abc123@gmail.com',
      year: 'QH-CLC-123'
    }];
    let total = accounts.length;
    dispatch(fetchStudentSuccessful(accounts, total))
  }
};

export const fetchLecturerAccounts = (page) => {
  return dispatch => {
    dispatch(updateLecturerPage(page));   
    dispatch(startFetching());
    // axios.get('/lecturers/')
    // .then(result => {
    //   let accounts;
    //   let total;
    //   dispatch(fetchStudentSuccessful(accounts, total))
    // })
    // .catch(error => {
    //   dispatch(fetchFailed(error.message))
    // })
    let accounts = [{
      id: uuidv4(),
      username: 'abc123',
      fullname: 'Yolo',
      VNUemail: 'abc123@gmail.com'
    }];
    let total = accounts.length;
    dispatch(fetchLecturerSuccessful(accounts, total))
  }
}

export const editStudent = (id, form) => {
  return dispatch => {
    axios.post('/students/' + id, form)
    .then(result => {
      dispatch(fetchStudentAccounts(0))
    })
    .catch(error => {
      dispatch(fetchFailed('Edit Student Failed'))
    })
  }
}

export const editLecturer = (id, form) => {
  return dispatch => {
    axios.post('/lecturers/' + id, form)
    .then(result => {
      dispatch(fetchStudentAccounts(0))
    })
    .catch(error => {
      dispatch(fetchFailed('Edit Lecturer Failed'))
    })
  }
}

export const deleteStudent = (id) => {
  return dispatch => {
    axios.delete('/students/' + id)
    .then(result => {
      dispatch(fetchStudentAccounts(0))
    })
    .catch(error => {
      dispatch(fetchFailed('Delete Student Failed'))
    })
  }
}

export const deleteLecturer = (id) => {
  return dispatch => {
    axios.delete('/lecturers/' + id)
    .then(result => {
      dispatch(fetchStudentAccounts(0))
    })
    .catch(error => {
      dispatch(fetchFailed('Delete Lecturer Failed'))
    })
  }
}

export const addStudent = (form) => {
  return dispatch => {
    console.log('studentForm', form)
    axios.post('/students', form)
    .then(result => {
      dispatch(fetchStudentAccounts(0))
    })
    .catch(error => {
      dispatch(fetchFailed('Add Student Failed'))
    })
  }
}

export const addLecturer = (form) => {
  return dispatch => {
    axios.post('/lecturers', form)
    .then(result => {
      dispatch(fetchStudentAccounts(0))
    })
    .catch(error => {
      dispatch(fetchFailed('Add Lecturer Failed'))
    })
  }
}