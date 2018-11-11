//Navigation for Admin
export const adminSideBar = [
  {
    label: 'Home',
    link: '/',
    icon: 'home'
  },
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
    label: 'Upload',
    link: '/students/upload'
  }
];

export const manageLecturerToolbar = [
  {
    label: 'Lecturer List',
    link: '/lecturers',
  },
  {
    label: 'Upload',
    link: '/lecturers/upload'
  }
];

export const manageSurveyToolbar = [
  {
    label: 'Survey List',
    link: '/surveys'
  },
  {
    label: 'Generate Survey',
    link: '/surveys/generate'
  },
  {
    label: 'Create New',
    link: '/surveys/create'
  }
]


//Navigation for Student
export const studentSideBar = [
  {
    label: 'Home',
    link: '/',
    icon: 'home'
  },
  {
    label: 'Classes List',
    link: '/classes',
    icon: 'list'    
  }
];


//Navigation for Student
export const lecturerSideBar = [
  {
    label: 'Home',
    link: '/',
    icon: 'home'
  },
  {
    label: 'Classes List',
    link: '/classes',
    icon: 'list'
  }
];