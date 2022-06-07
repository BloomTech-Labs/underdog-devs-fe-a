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
    label: 'Support',
    icon: <QuestionCircleOutlined />,
  },
  {
    key: 'darkmode',
    label: 'Darkmode',
    icon: <BulbOutlined />,
  },
];

export const menteeLinks = [
  {
    key: '/assignments',
    label: 'My Assignments',
  },
  {
    key: '/resources',
    label: 'Access Resources',
  },
  {
    key: 'addMentorReview',
    label: 'Add Mentor Review',
  },
];

export const mentorLinks = [
  {
    key: '/mentees',
    label: 'My Mentees',
  },
  {
    key: '/resources',
    label: 'Manage Resources',
    icon: <BookOutlined />,
  },
];

export const adminLinks = [
  { key: '/dashboard', label: 'dashboard', icon: <DashboardOutlined /> },
  { key: '/resources', label: 'resources', icon: <BookOutlined /> },
  { key: '/applications', label: 'applications', icon: <ContainerOutlined /> },
  { key: '/matching', label: 'matching', icon: <UsergroupAddOutlined /> },
  { key: '/users', label: 'users', icon: <ContactsOutlined /> },
  { key: '/attendance', label: 'attendance', icon: <FormOutlined /> },
  { key: '/meetings', label: 'meetings', icon: <CarryOutOutlined /> },
  { key: '/reviews', label: 'reviews' },
  { key: '/addMentorReview', label: 'addMentorReview' },
];
