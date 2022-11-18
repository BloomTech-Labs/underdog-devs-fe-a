import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Button, Modal } from 'antd';
import axios from 'axios';

import DynamicDropdown from '../DynamicDropdown';

const CreateModal = props => {
  const { data, setMeetings, meetings } = props;
  const [allMentors, allMentees] = data;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    meeting_topic: '',
    meeting_start_time: '',
    meeting_end_time: '',
    mentor_id: '',
    mentee_id: '',
    admin_meeting_notes: '',
    mentor_meeting_notes: '',
    mentee_meeting_notes: '',
  });

  const mentorsArray = props.data[0];
  const menteesArray = props.data[1];
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

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleOk = e => {
    e.preventDefault();
    const randomMeetingId = Math.floor(Math.random() * 100000000000000000);
    const meeting = {
      meeting_id: randomMeetingId,
      meeting_topic: formData.meeting_topic,
      meeting_start_time: formData.meeting_start_time,
      meeting_end_time: formData.meeting_end_time,
      mentor_id: formData.mentor_id,
      mentee_id: formData.mentee_id,
      admin_meeting_notes: formData.admin_meeting_notes,
      mentor_meeting_notes: formData.mentor_meeting_notes,
      mentee_meeting_notes: formData.mentee_meeting_notes,
    };
    axios.post(`${process.env.REACT_APP_API_URI}meetings/`, meeting);
    setMeetings([...meetings, meeting]);

    setIsModalOpen(false);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const mentorsMapped = () => {
    allMentors.map(mentor => {
      const entry = {
        value: mentor.mentor_id,
        label: mentor.mentor_id,
        name: mentor.mentor_id,
      };

      return entry;
    });
  };

  useEffect(() => {
    mentorsMapped();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allMentors, allMentees]);

  const handleAntChange = (value, option) => {
    setFormData({ ...formData, [option.name]: value });
  };
  const onChange = evt => {
    setFormData({
      ...formData,
      [evt.target.id]: evt.target.value,
    });
  };
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Create Meeting
      </Button>
      <Modal
        title="Create New Meeting"
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        onChange={handleChange}
        okText="Create new Meeting"
      >
        <form>
          <label style={{ marginLeft: '20px' }}>
            Mentor:
            <DynamicDropdown
              options={processedMentorsArray}
              placeholder="Select a Mentor"
              onChange={handleAntChange}
            />
          </label>
          <br />
          <label style={{ marginLeft: '20px' }}>
            Mentee:
            <DynamicDropdown
              options={processedMenteesArray}
              placeholder="Select a Mentee"
              onChange={handleAntChange}
            />
          </label>
          <br />

          <label>
            Meeting Topic:
            <input
              type="text"
              name="meeting_topic"
              value={formData.meeting_topic}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Meeting Start Time:
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
          <br />
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

          <label>
            Admin Meeting Notes:
            <input
              type="text"
              name="admin_meeting_notes"
              value={formData.admin_meeting_notes}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Mentor Meeting Notes:
            <input
              type="text"
              name="mentor_meeting_notes"
              value={formData.mentor_meeting_notes}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Mentee Meeting Notes:
            <input
              type="text"
              name="mentee_meeting_notes"
              value={formData.mentee_meeting_notes}
              onChange={handleChange}
            />
          </label>
        </form>
      </Modal>
    </>
  );
};
export default CreateModal;
