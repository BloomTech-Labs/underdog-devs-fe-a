import React, { useState, useEffect } from 'react';
import ViewAllMeetings from './ViewAllMeetings/ViewAllMeetings';
import useAxiosWithAuth0 from '../../../hooks/useAxiosWithAuth0';
import { Link } from 'react-router-dom';

const MentorMeetingDash = () => {
  const [meetings, setMeetings] = useState([
    {
      meeting_id: '',
      meeting_topic: '',
      created_at: '',
      updated_at: '',
      meeting_start_time: '',
      meeting_end_time: '',
      mentor_id: '',
      mentee_id: '',
      admin_meeting_notes: '',
      mentor_meeting_notes: '',
      mentee_meeting_notes: '',
      meeting_missed_by_mentee: '',
      user_id: '',
      profile_id: '',
      role: '',
    },
  ]);
  const { axiosWithAuth } = useAxiosWithAuth0();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axiosWithAuth()
      .get('/meetings')
      .then(response => {
        setMeetings(response.data);
        setLoading(false);
      })
      .catch(err => console.error(err.message));
  }, loading);

  //create a function called updateMeeting that will update the meeting in the database and then update the state of meetings
  const updateMeeting = meeting => {
    axiosWithAuth()
      .put(`/meetings/${meeting.id}`, meeting)
      .then(response => {
        setMeetings(
          meetings.map(item => {
            if (item.id === meeting.id) {
              return response.data;
            }
            return item;
          })
        );
      })
      .catch(err => console.error(err));
  };

  const generateMeetingJSX = () => {
    if (meetings.length === 0) {
      return <h1>No Meetings</h1>;
    } else {
      return meetings.map(meeting => (
        <li key={meeting.meeting_id}>
          <p>
            {meeting.mentor_id} has a meeting on {meeting.meeting_start_time}{' '}
            with {meeting.mentee_id} for the topic of {meeting.meeting_topic}.{' '}
          </p>
        </li>
      ));
    }
  };

  return (
    <div>
      <h1>Mentors Dashboard</h1>
      <p>
        Here, mentors can see any of their meetings with mentees, create new
        meetings for themselves, and update their existing meetings.
      </p>
      <p>
        This dashboard should allow CRUD ops ONLY where the logged in profile_id
        matches up to the mentor_id in the meetings data...{' '}
      </p>

      <p>
        View the other meetings dashboards...{' '}
        <Link to="/admin/meetings">Admin Meetings Dashboard...</Link>{' '}
        <Link to="/mentee/meetings">Mentee Mettings Dashboard...</Link>
      </p>
      <div>
        <ViewAllMeetings meetings={meetings} updateMeeting={updateMeeting} />
      </div>

      <div>
        <h1>Meetings Dashboard</h1>
      </div>
      {loading ? (
        <h3>Loading......</h3>
      ) : (
        <div>
          <h3>Meetings</h3>
          <ul>{generateMeetingJSX()}</ul>
        </div>
      )}
    </div>
  );
};

export default MentorMeetingDash;
