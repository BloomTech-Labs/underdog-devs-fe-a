import React, { useState } from 'react';
import { Form, Input, Button, Radio, Modal } from 'antd';

function EditProfile() {
  const initialValues = {
    name: '',
    email: '',
    location: '',
    company: '',
    tech_stack: '',
    commitment: '',
    etc_1: '',
    etc_2: '',
  };
  const [ModalOpen, setModalOpen] = useState(false);
  const [values, setValues] = useState(initialValues);

  const commits = ['1:1 Mentoring', 'Pair Program', 'Neither'];

  const showModal = () => {
    setModalOpen(true);
  };

  const handleCancel = () => {
    setModalOpen(false);
  };

  const handleOk = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Edit
      </Button>
      <Modal visible={ModalOpen} onCancel={handleCancel} onOk={handleOk}>
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 14,
          }}
        >
          <Form.Item
            label="Full Name"
            name="fullName"
            rules={[
              {
                required: true,
                message: 'Full Name Required!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: 'Email Required!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Location"
            name="location"
            rules={[
              {
                required: true,
                message: 'Location Required!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Company/Position"
            name="company"
            rules={[
              {
                required: true,
                message: 'Company / Position Required!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Tech Stack"
            name="tech_stack"
            rules={[
              {
                required: true,
                message: 'Tech Stack Required!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Commitment"
            name="commitment"
            rules={[
              {
                required: true,
                message: 'Commitment Required!',
              },
            ]}
          >
            <Radio.Group options={commits} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
export default EditProfile;
