import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Button, Modal } from 'antd';

import axios from 'axios';

const CreateModal = props => {
  const { visible, onCreate, onCancel } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [error, setError] = useState(''); //Used to keep track of errors.
  const [formData, setFormData] = useState({
    //Used to hold data about the form.
    meeting_topic: '',
    meeting_start_time: '',
    meeting_end_time: '',
    mentor_id: '',
    mentee_id: '',
  });

  const showModal = () => {
    setIsModalOpen(true);
  };

  //Each time the form changes:
  const onChange = evt => {
    // console.log(evt.target.id, evt.target.value); //For testing.

    //Update the form accordingly:
    setFormData({
      ...formData,
      [evt.target.id]: evt.target.value,
    });
  };

  //Handle the form submission.
  const handleOk = evt => {
    //**NOTE**: It is recommended that form validation be used BEFORE submitting.
    //For now this can be used for testing.

    axios //POST THE FORM DATA TO WHEREVER NEEDED.
      .put('http://localhost:8080/meetings/75279382836532200', { ...formData })
      .then(res => {
        console.log(res); //testing.

        //----
        //DO SOMETHING...?
        //----

        //Reset the form:
        setFormData({
          meeting_topic: '',
          meeting_start_time: '',
          meeting_end_time: '',
          mentor_id: '',
          mentee_id: '',
        });

        //Close the modal:
        setIsModalOpen(false);
      })
      .catch(err => {
        //If the axios call FAILS
        setError(err.message); //set an error for the user to see.
        console.log(err.message); //also console the error as well for the smarter kids.

        setTimeout(() => {
          setError(''); //clear the error after some time.
        }, 3200);
      });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Update Meeting
      </Button>
      <Modal
        title="Basic Modal"
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {/** --ERROR INPUT-- **/}
        <p
          id="error"
          style={{ display: 'flex', justifyContent: 'center', color: 'red' }}
        >
          {error}
        </p>
        {/** ----- **/}

        <form>
          {/** ------ TOPIC NAME ------ */}
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
          {/** ------------ */}

          {/** ------ START TIME------ */}
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

          {/** ------ END TIME ------ */}
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

          {/** ------ MENTOR ID ------ */}
          <label style={{ marginLeft: '20px' }}>
            Mentor ID:
            <input
              style={{
                color: 'black',
                width: '330px',
                marginBottom: '5px',
                marginLeft: '2px',
              }}
              type="text"
              name="Mentor-Id"
              id="mentor_id"
              placeholder="Mentor ID goes here"
              onChange={onChange}
            />
          </label>
          <br />
          {/** ------------ */}

          {/** ------ MENTEE ID ------ */}
          <label style={{ marginLeft: '20px' }}>
            Mentee ID:
            <input
              style={{
                color: 'black',
                width: '328px',
                marginBottom: '5px',
                marginLeft: '2px',
              }}
              type="text"
              name="Mentee-Id"
              id="mentee_id"
              placeholder="Mentee ID goes here"
              onChange={onChange}
            />
          </label>
          <br />
          {/** ------------ */}
        </form>
      </Modal>
    </>
  );
};
export default CreateModal;
