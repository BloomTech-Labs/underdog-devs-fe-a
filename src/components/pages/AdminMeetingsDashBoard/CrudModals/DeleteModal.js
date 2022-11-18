import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Button, Modal } from 'antd';
import useAxiosWithAuth0 from '../../../../hooks/useAxiosWithAuth0';
import DynamicDropdown from '../DynamicDropdown';

import axios from 'axios';

const DeleteModal = props => {
  const { data, setData, meetings } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(''); //Where the current error input is held.
  const [form, setForm] = useState({ INPUT: '' }); //Where the current form data is held.
  const { axiosWithAuth } = useAxiosWithAuth0();
  const { setMeetings } = props;

  const showModal = () => {
    setIsModalOpen(true);
  };
  const processedMeetingsArray = meetings.map(meeting => {
    const entry = {
      value: meeting.meeting_id,
      label: meeting.meeting_id,
      name: 'meeting_id',
    };
    return entry;
  });

  const handleOk = evt => {
    evt.preventDefault();

    //Make an axios call to delete data:
    //FORM DATA is located in the 'form' slice of state.
    axios
      .delete(`${process.env.REACT_APP_API_URI}meetings/${form.INPUT}`)
      .then(res => {
        setMeetings(
          meetings.filter(meeting => meeting.meeting_id !== form.INPUT)
        );
        setIsModalOpen(false);
        setForm({
          ...form,
          INPUT: '',
        });
      })
      .catch(err => {
        setError(err);
      });
    setForm({
      ...form,
      INPUT: '',
    });
  };

  const handleCancel = () => {
    //Reset the form
    setForm({
      INPUT: '',
    });

    //Close the modal.
    setIsModalOpen(false);
  };
  const handleAntChange = (value, option) => {
    setForm({ INPUT: value, [option.name]: value });
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Delete Meeting
      </Button>
      <Modal
        title="Basic Modal"
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Insert the ID you would like to delete: </p>
        <form>
          Meeting ID:
          <DynamicDropdown
            options={processedMeetingsArray}
            placeholder="Select a Meeting"
            onChange={handleAntChange}
          />
        </form>

        <p className="error" style={{ color: 'red' }}>
          {error}
        </p>
        {/** 
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
  */}
      </Modal>
    </>
  );
};
export default DeleteModal;
