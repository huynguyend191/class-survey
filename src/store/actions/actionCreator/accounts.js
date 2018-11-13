import * as actionTypes from '../actionTypes';
import uuidv4 from 'uuid';

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
  let accounts;
  if (page === 0) {
    accounts = [
      {
        id: uuidv4(),
        username: 16021391,
        fullname: 'Hello 123',
        VNUemail: '16021391@gmail.com',
        year: 'QH-2016-I/CQ-C-CLC'
      },
      {
        id: uuidv4(),        
        username: 16021392,
        fullname: 'Nani hello aloha',
        VNUemail: '16021392@gmail.com',
        year: 'QH-2016-I/CQ-C-CLC'
      },
      {
        id: uuidv4(),
        username: 16021393,
        fullname: 'Nani hello aloha',
        VNUemail: '16021392@gmail.com',
        year: 'QH-2016-I/CQ-C-CLC'
      },
      {
        id: uuidv4(),
        username: 16021394,
        fullname: 'Nani hello aloha',
        VNUemail: '16021392@gmail.com',
        year: 'QH-2016-I/CQ-C-CLC'
      },
      {
        id: uuidv4(),        
        username: 16021395,
        fullname: 'Nani hello aloha',
        VNUemail: '16021392@gmail.com',
        year: 'QH-2016-I/CQ-C-CLC'
      },
      {
        id: uuidv4(),
        username: 16021396,
        fullname: 'Nani hello aloha',
        VNUemail: '16021392@gmail.com',
        year: 'QH-2016-I/CQ-C-CLC'
      },
      {
        id: uuidv4(),
        username: 16021397,
        fullname: 'Nani hello aloha',
        VNUemail: '16021392@gmail.com',
        year: 'QH-2016-I/CQ-C-CLC'
      },
      {
        id: uuidv4(),
        username: 16021398,
        fullname: 'Nani hello aloha',
        VNUemail: '16021392@gmail.com',
        year: 'QH-2016-I/CQ-C-CLC'
      },
      {
        id: uuidv4(),
        username: 16021399,
        fullname: 'Nani hello aloha',
        VNUemail: '16021392@gmail.com',
        year: 'QH-2016-I/CQ-C-CLC'
      },
      {
        id: uuidv4(),
        username: 16021390,
        fullname: 'Nani hello aloha',
        VNUemail: '16021392@gmail.com',
        year: 'QH-2016-I/CQ-C-CLC'
      }
    ];
  } else {
    accounts = [
      {
        id: uuidv4(),
        username: 1602139119,
        fullname: 'Nani hello aloha',
        VNUemail: '16021392@gmail.com',
        year: 'QH-2016-I/CQ-C-CLC'
      },
      {
        id: uuidv4(),        
        username: 1602132132190,
        fullname: 'Nani hello aloha',
        VNUemail: '16021392@gmail.com',
        year: 'QH-2016-I/CQ-C-CLC'
      }
    ]
  }
  
  const total = 12;
  return dispatch => {
    dispatch(updateStudentPage(page));
    dispatch(startFetching());
    setTimeout(() => {dispatch(fetchStudentSuccessful(accounts, total))}, 1*1000);
    setTimeout(() => {dispatch(fetchFailed('Nani'))}, 1*1000);
  }
};

export const fetchLecturerAccounts = (page) => {
  const accounts = [
   
  ];
  const total = 0;
  return dispatch => {
    dispatch(updateLecturerPage(page));   
    dispatch(startFetching());
    setTimeout(() => {dispatch(fetchLecturerSuccessful(accounts, total))}, 1*1000);
    setTimeout(() => {dispatch(fetchFailed('Nani'))}, 1*1000);
  }
}

export const editStudent = (id) => {
  return dispatch => {
    dispatch(startFetching());
    dispatch(fetchStudentAccounts(0));
  }
}

export const editLecturer = (id) => {
  return dispatch => {
    dispatch(startFetching());
    dispatch(fetchLecturerAccounts(0));
  }
}

export const deleteStudent = (id) => {
  return dispatch => {
    dispatch(startFetching());
    dispatch(fetchStudentAccounts(0));
  }
}

export const deleteLecturer = (id) => {
  return dispatch => {
    dispatch(startFetching());
    dispatch(fetchLecturerAccounts(0));
  }
}