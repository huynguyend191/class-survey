//Navigation for Admin
export const adminSideBar = [
  {
    label: 'Manage Surveys',
    link: '/surveys',
    icon: 'bar_chart'
  },
  {
    label: 'Manage Students',
    link: '/students',
    icon: 'face'
  },
  {
    label: 'Manage Lecturers',
    link: '/lecturers',
    icon: 'school'
  }
];

export const manageStudentToolbar = [
  {
    label: 'Student List',
    link: '/students'
  },
  {
    label: 'Upload Students',
    link: '/students/upload'
  }
];

export const manageLecturerToolbar = [
  {
    label: 'Lecturer List',
    link: '/lecturers',
  },
  {
    label: 'Upload Lecturers',
    link: '/lecturers/upload'
  }
];

export const manageSurveyToolbar = [
  {
    label: 'Survey List',
    link: '/surveys'
  },
  {
    label: 'Survey Version',
    link: '/surveys/version'
  },
  {
    label: 'Upload Class',
    link: '/surveys/upload'
  }
]


//Navigation for Student
export const studentSideBar = [
  {
    label: 'Attend Survey',
    link: '/',
    icon: 'playlist_add_check'    
  }
];


//Navigation for Student
export const lecturerSideBar = [
  {
    label: 'Survey Results',
    link: '/',
    icon: 'list'
  }
];