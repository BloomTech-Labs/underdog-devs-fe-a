import {
  BookOutlined,
  CalendarOutlined,
  CarryOutOutlined,
  ContactsOutlined,
  ContainerOutlined,
  DashboardOutlined,
  FormOutlined,
  LineChartOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons';

export const sharedLinks = [
  {
    key: 'sub1',
    label: 'Schedule',
    icon: <CalendarOutlined />,
    children: [
      {
        key: '/calendar',
        label: 'Calendar',
      },
      {
        key: '/meetings/schedule',
        label: 'Schedule Meeting',
      },
    ],
  },
];

export const bottomSharedLinks = [
  {
    key: '/analytics',
    label: 'Insights',
    icon: <LineChartOutlined />,
  },
];

export const menteeLinks = [
  { key: '/meetings', label: 'Meetings', icon: <CarryOutOutlined /> },
  { key: '/profile', label: 'Profile' },
  { key: '/addMenteeReview', label: 'Add Mentee Review' },
];

export const mentorLinks = [
  { key: '/meetings', label: 'Meetings', icon: <CarryOutOutlined /> },
  { key: '/mentees', label: 'My Mentees' },
  { key: '/profile', label: 'Profile' },
  { key: '/addMentorReview', label: 'Add Mentor Review' },
];

export const adminLinks = [
  { key: '/applications', label: 'Applications', icon: <ContainerOutlined /> },
  { key: '/users', label: 'Users', icon: <ContactsOutlined /> },
  { key: '/matching', label: 'Matching', icon: <UsergroupAddOutlined /> },
  { key: '/attendance', label: 'Attendance', icon: <FormOutlined /> },
  { key: '/resources', label: 'Resources', icon: <BookOutlined /> },
  { key: '/reviews', label: 'Reviews' },
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
