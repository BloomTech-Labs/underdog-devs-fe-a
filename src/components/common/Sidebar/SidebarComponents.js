import React from 'react';
import CalendarFeature from '../Calendar';
import PendingApplications from '../../pages/PendingApplications/PendingApplication';
import MentorMenteeMatching from '../../pages/MentorMenteeMatching/MentorMenteeMatching';
import UserManagement from '../../pages/UserManagement/UserManagement';
import Attendance from '../../pages/Attendance/attendance';
import Dashboard from '../../pages/Dashboard/Dashboard';
import { Profile } from '../../pages/Profile';
import Reviews from '../../pages/Reviews/MentorReviews';
import { ManageResources } from '../../pages/ManageResources/ManageResources';
import MenteeAddReview from '../../pages/AddReviews/MenteeAddReview';
import MentorAddReview from '../../pages/AddReviews/MentorAddReview';

// These components are being exported to Sidebar.js, from there they are being dynamically rendered based on what role the user is
const MenteeComponents = {
  1: <CalendarFeature />,
  2: <div>"Upcoming Meetings" Component goes here</div>,
  3: <div>"My Assignments" Component goes here</div>,
  4: <div>"Access Resources" Component goes here</div>,

  8: <Profile />,
  9: <div>Do we need Account settings?</div>,
  11: <div>Do we need Donate?</div>,
  12: <div>"Support" Component goes here</div>,
  13: <MenteeAddReview />,
};

const MentorComponents = {
  1: <CalendarFeature />,
  2: <div>"Schedule Meeting"</div>,
  3: <div>"My Mentees" Component goes here</div>,
  4: <ManageResources />,

  8: <Profile />,
  9: <div>Do we need Account settings?</div>,
  11: <div>Do we need Donate?</div>,
  12: <div>"Support" Component goes here</div>,
  13: <MentorAddReview />,
};

const AdminComponents = {
  0: <Dashboard />,
  1: <CalendarFeature />,
  2: <div>"Schedule Interview" Component goes here</div>,
  3: <ManageResources />,
  4: <PendingApplications />,
  5: <MentorMenteeMatching />,
  6: <UserManagement />,
  7: <div>"View Support Requests" Component goes here</div>,
  8: <div>"View All Meetings" Component goes here</div>,
  9: <Profile />,
  10: <div>Do we need Account settings?</div>,
  11: <Attendance />,
  12: <Reviews />,
};

export { AdminComponents, MentorComponents, MenteeComponents };
