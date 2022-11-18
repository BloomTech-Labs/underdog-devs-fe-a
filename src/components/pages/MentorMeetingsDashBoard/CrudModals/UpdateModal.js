import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Button, Modal } from 'antd';
import DynamicDropdown from '../DynamicDropdown';
import useAxiosWithAuth0 from '../../../../hooks/useAxiosWithAuth0';

const CreateModal = props => {
  const { data, setMeetings, meetings } = props;
  const mentorsArray = data[0];
  const menteesArray = data[1];
  const meetingsArray = data[2];
  const { axiosWithAuth } = useAxiosWithAuth0();

  const processedMentorsArray = mentorsArray.map(mentor => {
    const entry = {
      value: mentor.profile_id,
      label: mentor.profile_id,
      name: 'mentor_id',
    };

    return entry;
  });

  const processedMenteesArray = menteesArray.map(mentee => {
    const entry = {
      value: mentee.profile_id,
      label: mentee.profile_id,
      name: 'mentee_id',
    };

    return entry;
  });

  const processedMeetingsArray = meetingsArray.map(meeting => {
    const entry = {
      value: meeting.meeting_id,
      label: meeting.meeting_id,
      name: 'meeting_id',
    };

    return entry;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    meeting_id: '',
    meeting_topic: '',
    meeting_start_time: '',
    meeting_end_time: '',
    mentor_id: '',
    mentee_id: '',
  });

  const showModal = () => {
    setIsModalOpen(true);
  };

  const onChange = evt => {
    setFormData({
      ...formData,
      [evt.target.id]: evt.target.value,
    });
  };
  const handleOk = e => {
    e.preventDefault();
    axiosWithAuth()
      .put(`/meetings/${formData.meeting_id}`, formData)
      .then(res => {
        const updatedMeetings = meetings.map(meeting => {
          if (meeting.meeting_id === formData.meeting_id) {
            return formData;
          } else {
            return meeting;
          }
        });
        setMeetings(updatedMeetings);
        setIsModalOpen(false);
        setFormData({
          meeting_id: '',
          meeting_topic: '',
          meeting_start_time: '',
          meeting_end_time: '',
          mentor_id: '',
          mentee_id: '',
        });
      })
      .catch(err => {
        setError(err);
      });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleAntChange = (value, option) => {
    setFormData({ ...formData, [option.name]: value });
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Update Meeting
      </Button>
      <Modal
        title="Update Existing Meeting"
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Update Existing Meeting"
      >
        <p
          id="error"
          style={{ display: 'flex', justifyContent: 'center', color: 'red' }}
        >
          {error}
        </p>

        <form>
          <label style={{ marginLeft: '20px' }}>
            Meeting ID:
            <DynamicDropdown
              options={processedMeetingsArray}
              placeholder="Select a Meeting"
              onChange={handleAntChange}
            />
          </label>
          <br />
          <label style={{ marginLeft: '20px' }}>
            Topic:
            <input
              style={{
                color: 'black',
                width: '361px',
                marginBottom: '5px',
                marginLeft: '2px',
              }}
              type="text"
              name="Topic"
              id="meeting_topic"
              placeholder="Topic goes here"
              onChange={onChange}
            />
          </label>
          <br />
          <label style={{ marginLeft: '20px' }}>
            Start Time:
            <input
              style={{
                color: 'black',
                width: '110px',
                marginLeft: '10px',
                marginBottom: '5px',
              }}
              type="datetime-local"
              name="Start-Time"
              id="meeting_start_time"
              onChange={onChange}
            />
          </label>
          <label style={{ marginLeft: '20px' }}>
            End Time:
            <input
              style={{
                color: 'black',
                width: '110px',
                marginLeft: '10px',
                marginBottom: '5px',
              }}
              type="datetime-local"
              name="End-Time"
              id="meeting_end_time"
              onChange={onChange}
            />
          </label>
          <br />
          {/** ------------ */}
          <label style={{ marginLeft: '20px' }}>
            Mentor ID:
            <DynamicDropdown
              options={processedMentorsArray}
              placeholder="Select a Mentor"
              onChange={handleAntChange}
            />{' '}
          </label>
          <br />

          <label style={{ marginLeft: '20px' }}>
            Mentee ID:
            <DynamicDropdown
              options={processedMenteesArray}
              placeholder="Select a Mentee"
              onChange={handleAntChange}
            />{' '}
          </label>
          <br />
        </form>
      </Modal>
    </>
  );
};
export default CreateModal;
