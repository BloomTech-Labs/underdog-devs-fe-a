import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Button, Modal } from 'antd';

import axios from 'axios';

const DeleteModal = props => {
  const { visible, onCreate, onCancel } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(''); //Where the current error input is held.
  const [form, setForm] = useState({ INPUT: '' }); //Where the current form data is held.

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = evt => {
    //Make an axios call to delete data:
    //FORM DATA is located in the 'form' slice of state.
    axios
      .delete(`http://localhost:8080/meetings/${form.INPUT}`)
      .then(res => {
        //Do something with the data
        //console.log(res, res.data);

        //Reset the form:
        setForm({
          ...form,
          INPUT: '',
        });

        //Close the modal:
        setIsModalOpen(false);
      })
      .catch(err => {
        //Update state and output error:
        setError(err.message);
        console.error(err.message);

        setTimeout(() => {
          setError('');
        }, 3000);
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
