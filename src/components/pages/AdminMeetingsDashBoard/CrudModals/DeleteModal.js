import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Button, Modal } from 'antd';
import DynamicDropdown from '../DynamicDropdown';
import useAxiosWithAuth0 from '../../../../hooks/useAxiosWithAuth0';
const DeleteModal = props => {
  const axiosWithAuth = useAxiosWithAuth0();
  const { meetings } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ INPUT: '' });
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

    axiosWithAuth
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
    setForm({
      INPUT: '',
    });
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
      </Modal>
    </>
  );
};
export default DeleteModal;
