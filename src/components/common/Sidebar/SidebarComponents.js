import React from 'react';
import CalendarFeature from '../Calendar';
import RenderUpdateProfile from '../../pages/UpdateProfile/RenderUpdateProfile';

const MenteeComponents = {
  1: <CalendarFeature />,
  2: <div>"Upcoming Meetings" Component goes here</div>,
  3: <div>"My Assignments" Component goes here</div>,
  4: <div>"Access Resources" Component goes here</div>,
  5: <div>"Create Assignments" Component goes here</div>,
  6: <div>"New Request" Component goes here</div>,
  7: <div>"Request Status" Component goes here</div>,
  8: <RenderUpdateProfile />,
  9: <div>"Account Settings" Component goes here</div>,
  11: <div>"Donate" Component goes here</div>,
  12: <div>"Support" Component goes here</div>,
};

const MentorComponents = {
  1: <CalendarFeature />,
  2: <div>"Schedule Meeting"</div>,
  3: <div>"My Mentees" Component goes here</div>,
  4: <div></div>,
  5: <div>"Create Assignments" Component goes here</div>,
  6: <div>"New Request" Component goes here</div>,
  7: <div>"Request Status" Component goes here</div>,
  8: <RenderUpdateProfile />,
  9: <div>"Account Settings" Component goes here</div>,
  11: <div>"Donate" Component goes here</div>,
  12: <div>"Support" Component goes here</div>,
};

const AdminComponents = {
  1: <CalendarFeature />,
  2: <div>"Check Availabilities" Component goes here</div>,
  3: <div>"Schedule Meeting"</div>,
  4: <div>"View Assignments" Component goes here</div>,
  5: <div>"Create Assignments" Component goes here</div>,
  6: <div>"New Request" Component goes here</div>,
  7: <div>"Request Status" Component goes here</div>,
  8: <RenderUpdateProfile />,
  9: <div>"Account Settings" Component goes here</div>,
  11: <div>"Donate" Component goes here</div>,
  12: <div>"Support" Component goes here</div>,
};

export { AdminComponents, MentorComponents, MenteeComponents };
