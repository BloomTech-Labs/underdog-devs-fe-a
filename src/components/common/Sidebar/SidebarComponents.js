import React from 'react';
import CalendarFeature from '../Calendar';
import UserManagement from '../../pages/UserManagement/UserManagement';
import { ManageResources } from '../../pages/ManageResources/ManageResources';
// These components are being exported to Sidebar.js, from there they are being dynamically rendered based on what role the user is
const MenteeComponents = {
  1: <CalendarFeature />,
  2: <div>"Upcoming Meetings" Component goes here</div>,
  3: <div>"My Assignments" Component goes here</div>,
  4: <div>"Access Resources" Component goes here</div>,

  8: <div>"Profile Settings" goes here</div>,
  9: <div>Do we need Account settings?</div>,
  11: <div>Do we need Donate?</div>,
  12: <div>"Support" Component goes here</div>,
};

const MentorComponents = {
  1: <CalendarFeature />,
  2: <div>"Schedule Meeting"</div>,
  3: <div>"My Mentees" Component goes here</div>,
  4: <ManageResources />,

  8: <div>"Profile Settings" goes here</div>,
  9: <div>Do we need Account settings?</div>,
  11: <div>Do we need Donate?</div>,
  12: <div>"Support" Component goes here</div>,
};

const AdminComponents = {
  0: <div>"Dashboard" Component goes here</div>,
  1: <CalendarFeature />,
  2: <div>"Schedule Interview" Component goes here</div>,
  3: <ManageResources />,
  4: <div>"Pending Applications" Component goes here</div>,
  5: <UserManagement />,
  6: <div>"View Support Requests" Component goes here</div>,
  7: <div>"View All Meetings" Component goes here</div>,
  8: <div>"Profile Settings" goes here</div>,
  9: <div>Do we need Account settings?</div>,
};

export { AdminComponents, MentorComponents, MenteeComponents };
