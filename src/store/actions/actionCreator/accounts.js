import * as actionTypes from '../actionTypes';

export const startFetching = () => {
  return {
    type: actionTypes.START_FETCHING
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
  console.log('lec: ', page)
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
        username: 16021391,
        fullname: 'Nguyễn Đắc Huy',
        VNUemail: '16021391@gmail.com',
        year: 'QH-2016-I/CQ-C-CLC'
      },
      {
        username: 16021392,
        fullname: 'Nani hello aloha',
        VNUemail: '16021392@gmail.com',
        year: 'QH-2016-I/CQ-C-CLC'
      },
      {
        username: 16021393,
        fullname: 'Nani hello aloha',
        VNUemail: '16021392@gmail.com',
        year: 'QH-2016-I/CQ-C-CLC'
      },
      {
        username: 16021394,
        fullname: 'Nani hello aloha',
        VNUemail: '16021392@gmail.com',
        year: 'QH-2016-I/CQ-C-CLC'
      },
      {
        username: 16021395,
        fullname: 'Nani hello aloha',
        VNUemail: '16021392@gmail.com',
        year: 'QH-2016-I/CQ-C-CLC'
      },
      {
        username: 16021396,
        fullname: 'Nani hello aloha',
        VNUemail: '16021392@gmail.com',
        year: 'QH-2016-I/CQ-C-CLC'
      },
      {
        username: 16021397,
        fullname: 'Nani hello aloha',
        VNUemail: '16021392@gmail.com',
        year: 'QH-2016-I/CQ-C-CLC'
      },
      {
        username: 16021398,
        fullname: 'Nani hello aloha',
        VNUemail: '16021392@gmail.com',
        year: 'QH-2016-I/CQ-C-CLC'
      },
      {
        username: 16021399,
        fullname: 'Nani hello aloha',
        VNUemail: '16021392@gmail.com',
        year: 'QH-2016-I/CQ-C-CLC'
      },
      {
        username: 16021390,
        fullname: 'Nani hello aloha',
        VNUemail: '16021392@gmail.com',
        year: 'QH-2016-I/CQ-C-CLC'
      }
    ];
  } else {
    accounts = [
      {
        username: 1602139119,
        fullname: 'Nani hello aloha',
        VNUemail: '16021392@gmail.com',
        year: 'QH-2016-I/CQ-C-CLC'
      },
      {
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
    setTimeout(() => {dispatch(fetchStudentSuccessful(accounts, total))}, 2*1000);
  }
};

export const fetchLecturerAccounts = (page) => {
  console.log('fetch: ',page);
  const accounts = [
    {
      username: 'thanhld',
      fullname: 'Lê Đình Thanh',
      VNUemail: 'thanhld@vnu.edu.vn',
    },
    {
      username: 'tunghx',
      fullname: 'Hoàng Xuân Tùng',
      VNUemail: 'tunghx@vnu.edu.vn',
    }
  ];
  const total = 30;
  return dispatch => {
    dispatch(updateLecturerPage(page));   
    dispatch(startFetching());
    setTimeout(() => {dispatch(fetchLecturerSuccessful(accounts, total))}, 2*1000);
  }
}


