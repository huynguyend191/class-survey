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
    label: 'Upload Files',
    link: '/students/upload'
  }
];

export const manageLecturerToolbar = [
  {
    label: 'Lecturer List',
    link: '/lecturers',
  },
  {
    label: 'Upload Files',
    link: '/lecturers/upload'
  }
];

export const manageSurveyToolbar = [
  {
    label: 'Survey List',
    link: '/surveys'
  },
  {
    label: 'Generate Form',
    link: '/surveys/generate'
  },
  {
    label: 'Create Survey',
    link: '/surveys/create'
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
    icon: 'list'    
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