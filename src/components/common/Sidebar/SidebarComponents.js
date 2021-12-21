import React from 'react';
import CalendarFeature from '../Calendar';
import UserManagement from '../../pages/UserManagement/UserManagement';

// These components are being exported to Sidebar.js, from there they are being dynamically rendered based on what role the user is
const MenteeComponents = {
  1: <CalendarFeature />,
  2: <div>"Upcoming Meetings" Component goes here</div>,
  3: <div>"My Assignments" Component goes here</div>,
  4: <div>"Access Resources" Component goes here</div>,
  5: <div>"Create Assignments" Component goes here</div>,
  6: <div>"New Request" Component goes here</div>,
  7: <div>"Request Status" Component goes here</div>,
  8: <UserManagement />,
  9: <div>Do we need Account settings?</div>,
  11: <div>Do we need Donate?</div>,
  12: <div>"Support" Component goes here</div>,
};

const MentorComponents = {
  1: <CalendarFeature />,
  2: <div>"Schedule Meeting"</div>,
  3: <div>"My Mentees" Component goes here</div>,
  4: <div>"Manage Resources" Component goes here</div>,
  5: <div>"Create Assignments" Component goes here</div>,
  6: <div>"Request Resources" Component goes here</div>,
  7: <div>"Track Resources" Component goes here</div>,
  8: <UserManagement />,
  9: <div>Do we need Account settings?</div>,
  11: <div>Do we need Donate?</div>,
  12: <div>"Support" Component goes here</div>,
};

const AdminComponents = {
  1: <CalendarFeature />,
  2: <div>"Schedule Interview" Component goes here</div>,
  3: <div>"Assign Resources" Component goes here</div>,
  4: <div>"Track Resources" Component goes here</div>,
  5: <div>"Pending Applications" Component goes here</div>,
  6: <div>"Manage Users" Component goes here</div>,
  7: <div>"Support Requests" Component goes here</div>,
  8: <UserManagement />,
  9: <div>Do we need Account settings?</div>,
};

export { AdminComponents, MentorComponents, MenteeComponents };
