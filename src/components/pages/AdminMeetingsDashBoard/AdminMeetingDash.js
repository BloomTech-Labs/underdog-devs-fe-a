import React, { useState, useEffect } from 'react';
import ViewAllMeetings from './ViewAllMeetings/ViewAllMeetings';
import useAxiosWithAuth0 from '../../../hooks/useAxiosWithAuth0';
import { Link } from 'react-router-dom';
import CreateModal from './CrudModals/CreateModal';
import DeleteModal from './CrudModals/DeleteModal';
import UpdateModal from './CrudModals/UpdateModal';

const AdminMeetingDash = () => {
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
  const { isModalOpen, setIsModalOpen } = useState(false);
  const { confirmLoading, setConfirmLoading } = useState(false);
  const { modalText, setModalText } = useState('Content of the modal');
  const { allMentors, setAllMentors } = useState([]);
  const { allMentees, setAllMentees } = useState([]);

  //create a function called createNewMeeting that will post a new meeting to the database and then update the state of meetings
  const createNewMeeting = meeting => {
    axiosWithAuth()
      .post('/meetings', meeting)
      .then(response => {
        setMeetings([...meetings, response.data]);
      })
      .catch(err => console.error(err));
  };
  // get all meetings
  const getAllMeetings = () => {
    axiosWithAuth()
      .get('/meetings')
      .then(response => {
        setMeetings(response.data);
        console.log(response.data);
        setLoading(false);
      })
      .catch(err => console.error(err.message));
  };

  //create a function called deleteMeeting that will delete the meeting from the database and then update the state of meetings
  const deleteMeeting = meeting => {
    axiosWithAuth()
      .delete(`/meetings/${meeting.id}`)
      .then(response => {
        setMeetings(meetings.filter(item => item.id !== meeting.id));
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
            <h3>Meeting ID: {meeting.meeting_id}</h3>
            {meeting.mentor_id} has a meeting on {meeting.meeting_start_time}{' '}
            with {meeting.mentee_id} for the topic of {meeting.meeting_topic}.{' '}
          </p>
        </li>
      ));
    }
  };

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

  const getAllMentors = () => {
    axiosWithAuth()
      .get('/profile/role/mentor')
      .then(response => {
        setAllMentors(response.data);
      })
      .catch(err => console.error(err));
  };

  // const getAllMentees = () => {
  //   axiosWithAuth()
  //     .get('/profile/role/mentee')
  //     .then(response => {
  //       setAllMentees(response.data);
  //     })
  //     .catch(err => console.error(err));
  // };

  useEffect(() => {
    async function getAllMentors() {
      try {
        const response = await axiosWithAuth().get('/profile/role/mentor');
        setAllMentors(response.data);
      } catch (err) {
        console.error(err);
      }
    }

    async function getAllMentees() {
      try {
        const response = await axiosWithAuth().get('/profile/role/mentee');
        setAllMentees(response.data);
      } catch (err) {
        console.error(err);
      }
    }
    setLoading(true);
    getAllMeetings();
    getAllMentors();
    console.log('endUseEffect');
    console.log(meetings);
    console.log(allMentees);
    console.log(allMentors);
  }, []);

  return (
    <div>
      <h1>ADMIN MEETINGS DASHBOARD</h1>
      <p>
        Here an admin user can CRUD all meetings from anybody on the platform.
      </p>
      <p>
        View the other meetings dashboards...{' '}
        <Link to="/mentor/meetings">Mentor Meetings Dashboard...</Link>{' '}
        <Link to="/mentee/meetings">Mentee Mettings Dashboard...</Link>
      </p>
      <div>
        <ViewAllMeetings
          meetings={meetings}
          createNewMeeting={createNewMeeting}
          updateMeeting={updateMeeting}
          deleteMeeting={deleteMeeting}
        />
      </div>

      <div>
        <h1>Meetings Dashboard</h1>
        <CreateModal />
        <DeleteModal />
        <UpdateModal />
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

export default AdminMeetingDash;
