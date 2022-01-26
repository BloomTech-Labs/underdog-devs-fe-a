import React, { useState } from 'react';
import { Form, Input, Button, Radio, Modal, Dropdown } from 'antd';

function EditProfile() {
  const initialValues = {
    commitment: '',
  };

  const [ModalOpen, setModalOpen] = useState(false);
  const [radio, setRadio] = useState(initialValues);

  const commits = ['1:1 Mentoring', 'Pair Program', 'Neither'];

  //// Event Handlers

  const showModal = () => {
    setModalOpen(true);
  };

  const handleCancel = () => {
    setModalOpen(false);
  };

  const handleOk = () => {
    setModalOpen(false);
  };

  const handleRadio = event => {
    setRadio(event.target.value);
  };
  ////

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Edit
      </Button>
      <Modal visible={ModalOpen} onCancel={handleCancel} onOk={handleOk}>
        <h1>Edit Profile:</h1>
        <br />
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 14,
          }}
        >
          <Form.Item label="First Name" name="firstName">
            <Input />
          </Form.Item>

          <Form.Item label="Last Name" name="lastName">
            <Input />
          </Form.Item>

          <Form.Item label="Email" name="email">
            <Input />
          </Form.Item>

          <Form.Item label="Location" name="location">
            <Input />
          </Form.Item>

          <Form.Item label="Company/Position" name="company">
            <Input />
          </Form.Item>

          <Form.Item label="Tech Stack" name="tech_stack">
            <Input />
          </Form.Item>

          <Form.Item
            label="Commitment"
            name="commitment"
            labelCol={{
              span: 13,
            }}
            wrapperCol={{
              span: 9,
            }}
          >
            <Radio.Group name="commitment">
              <Radio value="1:1 Mentoring" onClick={handleRadio}>
                1:1 Mentoring
              </Radio>
              <Radio value="Pair Programming" onClick={handleRadio}>
                Pair Programming
              </Radio>
              <Radio value="Neither" onClick={handleRadio}>
                Neither
              </Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
export default EditProfile;
