import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Button, Modal } from 'antd';
import useAxiosWithAuth0 from '../../../../hooks/useAxiosWithAuth0';
import axios from 'axios';

import DynamicDropdown from '../DynamicDropdown';

const CreateModal = props => {
  const { axiosWithAuth } = useAxiosWithAuth0();
  const { data } = props;
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
  console.log('props.data', props.data);

  const mentorsArray = props.data[0];
  const menteesArray = props.data[1];
  const processedMentorsArray = mentorsArray.map(mentor => {
    const entry = {
      value: mentor.profile_id,
      label: mentor.profile_id,
      name: 'mentor_id',
    };
    console.log('entry', entry);
    return entry;
  });

  console.log('processedMentorsArray', processedMentorsArray);

  const processedMenteesArray = menteesArray.map(mentee => {
    const entry = {
      value: mentee.profile_id,
      label: mentee.profile_id,
      name: 'mentor_id',
    };
    console.log('entry', entry);
    return entry;
  });

  console.log('processedMenteesArray', processedMenteesArray);
  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };
  const handleSubmit = e => {
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
    console.log(meeting);
    axios.post(`${process.env.REACT_APP_API_URI}meetings/`, meeting);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const mentorsMapped = () => {
    allMentors.map(mentor => {
      console.log(mentor.user_id);
      const entry = {
        value: mentor.mentor_id,
        label: mentor.mentor_id,
        name: mentor.mentor_id,
      };
      console.log(entry);
      return entry;
    });
  };
  //   const menteesMapped = () => {
  //     allMentees.map(mentee => {
  //       let entry = {
  //         value: mentee.mentee_id,
  //         label: mentee.mentee_id,
  //         name: "mentee_id"
  //       };
  //       return entry;
  //     });
  //     console.log(menteesMapped)
  //   };
  //       console.log(entry);
  //       return entry;
  // });

  useEffect(() => {
    console.log(allMentors);
    console.log(allMentees);
    mentorsMapped();
  }, [allMentors, allMentees]);
  const mentors = [
    {
      value: 'mark',
      label: 'Mark',
      name: 'mentor_id',
    },
    {
      value: 'joe',
      label: 'Joe',
      name: 'mentor_id',
    },
    {
      value: 'jane',
      label: 'Jane',
      name: 'mentor_id',
    },
  ];

  const mentees = [
    {
      value: 'jack',
      label: 'Jack',
      name: 'mentee_id',
    },
    {
      value: 'lucy',
      label: 'Lucy',
      name: 'mentee_id',
    },
    {
      value: 'kami',
      label: 'Kami',
      name: 'mentee_id',
    },
    {
      value: 'Yiminghe',
      label: 'Yiminghe',
      name: 'mentee_id',
    },
  ];

  const handleAntChange = (value, option) => {
    console.log(option, value);
    setFormData({ ...formData, [option.name]: value });
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Create Meeting
      </Button>
      <br />
      <Modal
        title="Basic Modal"
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        onChange={handleChange}
      >
        <DynamicDropdown
          options={processedMentorsArray}
          placeholder="Select a Mentor"
          onChange={handleAntChange}
        />
        <DynamicDropdown
          options={processedMenteesArray}
          placeholder="Select a Mentee"
          onChange={handleAntChange}
        />

        <form
          onSubmit={() => {
            handleSubmit();
          }}
        >
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
              type="text"
              name="meeting_start_time"
              value={formData.meeting_start_time}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Meeting End Time:
            <input
              type="text"
              name="meeting_end_time"
              value={formData.meeting_end_time}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Mentor ID:
            <input
              type="text"
              name="mentor_id"
              value={formData.mentor_id}
              onChange={handleChange}
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
          <br />
        </form>
        <Button type="primary" htmlType="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </Modal>
    </>
  );
};
export default CreateModal;
