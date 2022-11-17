import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Button, Modal } from 'antd';
import useAxiosWithAuth0 from '../../../../hooks/useAxiosWithAuth0';

import axios from 'axios';

const DeleteModal = props => {
  const { visible, onCreate, onCancel, setMeetings, meetings } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(''); //Where the current error input is held.
  const [form, setForm] = useState({ INPUT: '' }); //Where the current form data is held.
  const { axiosWithAuth } = useAxiosWithAuth0();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = evt => {
    //Make an axios call to delete data:
    //FORM DATA is located in the 'form' slice of state.
    axiosWithAuth()
      .delete(`${process.env.REACT_APP_API_URI}meetings/${form.INPUT}`)
      .then(res => {
        console.log(res);
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
        console.log(err);
        setError(err);
      });
  };

  const handleCancel = () => {
    //Reset the form
    setForm({
      ...form,
      INPUT: '',
    });

    //Close the modal.
    setIsModalOpen(false);
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
          <label>
            ID:
            <input
              type="text"
              name="INPUT"
              style={{ color: 'black' }}
              value={form.INPUT}
              onChange={evt => {
                setForm({
                  ...form,
                  INPUT: evt.target.value,
                });
              }}
            />
          </label>
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
