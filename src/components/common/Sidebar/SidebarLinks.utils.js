import {
  BookOutlined,
  BulbOutlined,
  CalendarOutlined,
  CarryOutOutlined,
  ContactsOutlined,
  ContainerOutlined,
  DashboardOutlined,
  FormOutlined,
  QuestionCircleOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons';

export const sharedLinks = [
  {
    key: 'sub1', // the initial submenu
    label: 'Schedule',
    icon: <CalendarOutlined />,
    children: [
      {
        key: '/calendar', // for all Users
        label: 'Calendar',
      },
      {
        key: '/meetings/schedule', // Mentors or Admins
        label: 'Schedule Meeting',
      },
    ],
  },
];

export const bottomSharedLinks = [
  {
    key: '/support',
    label: 'Insights',
    icon: <QuestionCircleOutlined />,
  },
];

/**
 * Khaleel Musleh
 * Removed all the links which are non-functional, they are all available in the devLinks below
 */

export const menteeLinks = [];

export const mentorLinks = [];

export const adminLinks = [
  { key: '/applications', label: 'Applications', icon: <ContainerOutlined /> },
  { key: '/users', label: 'Users', icon: <ContactsOutlined /> },
];

export const superAdminLinks = [
  { key: '/dashboard', label: 'Dashboard', icon: <DashboardOutlined /> },
  { key: '/resources', label: 'Resources', icon: <BookOutlined /> },
  { key: '/applications', label: 'Applications', icon: <ContainerOutlined /> },
  { key: '/matching', label: 'Matching', icon: <UsergroupAddOutlined /> },
  { key: '/users', label: 'Users', icon: <ContactsOutlined /> },
  { key: '/attendance', label: 'Attendance', icon: <FormOutlined /> },
  { key: '/meetings', label: 'Meetings', icon: <CarryOutOutlined /> },
  { key: '/reviews', label: 'Reviews' },
  { key: '/addMentorReview', label: 'Add Mentor Review' },
  { key: '/mentees', label: 'My Mentees' },
  { key: '/assignments', label: 'My Assignments' },
];

export const devLinks = [
  { key: '/dashboard', label: 'Dashboard', icon: <DashboardOutlined /> },
  { key: '/resources', label: 'Resources', icon: <BookOutlined /> },
  { key: '/applications', label: 'Applications', icon: <ContainerOutlined /> },
  { key: '/matching', label: 'Matching', icon: <UsergroupAddOutlined /> },
  { key: '/users', label: 'Users', icon: <ContactsOutlined /> },
  { key: '/attendance', label: 'Attendance', icon: <FormOutlined /> },
  { key: '/meetings', label: 'Meetings', icon: <CarryOutOutlined /> },
  { key: '/reviews', label: 'Reviews' },
  { key: '/addMentorReview', label: 'Add Mentor Review' },
  { key: '/mentees', label: 'My Mentees' },
  { key: '/assignments', label: 'My Assignments' },
];
