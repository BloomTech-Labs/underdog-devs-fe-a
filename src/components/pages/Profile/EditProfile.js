import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Modal, TreeSelect } from 'antd';
import '../../../styles/styles.css';
import { connect } from 'react-redux';
import axiosWithAuth from '../../../utils/axiosWithAuth';

function EditProfile({ userInfo }) {
  const [form] = Form.useForm();

  const [ModalOpen, setModalOpen] = useState(false);

  const showModal = () => setModalOpen(true);

  const handleCancel = () => setModalOpen(false);

  const onCreate = values => {
    setModalOpen(false);
    axiosWithAuth()
      .put('/profile', values)
      .then(res => {
        form.setFieldsValue(values);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const approved = () => {
    form
      .validateFields()
      .then(values => {
        form.resetFields();
        onCreate(values);
      })
      .catch(err => {
        console.log(err);
      });
  };

  //// Styling
  const buttonStyle = {
    backgroundColor: '#003D71',
    color: '#ffffff',
  };

  //// Dropdown Data

  const treeData = [
    {
      title: 'React',
      value: 'React',
      key: 'React',
    },
    {
      title: 'Python',
      value: 'Python',
      key: 'Python',
    },

    {
      title: 'Javascript',
      value: 'Javascript',
      key: 'Javascript',
    },
  ];

  const treeProps = {
    treeData,
    placeholder: 'Please Select',
    treeCheckable: true,
  };

  /////

  return (
    <>
      <Button style={buttonStyle} onClick={showModal}>
        Edit
      </Button>
      <Modal
        visible={ModalOpen}
        onCancel={handleCancel}
        onOk={approved}
        title="Update Information:"
        okText="Update"
        className="modalStyle"
      >
        <Form
          form={form}
          name="basic"
          initialValues={userInfo}
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 14,
          }}
        >
          <Form.Item
            label="First Name"
            name="first_name"
            initialValue={form.first_name}
            rules={[
              {
                required: true,
                message: 'First Name Required!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Last Name"
            name="last_name"
            initialValue={form.last_name}
            rules={[
              {
                required: true,
                message: 'Last Name Required!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            initialValue={form.email}
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
            initialValue={form.location}
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
            initialValue={form.company}
          >
            <Input />
          </Form.Item>

          {/* <Form.Item
            label="Tech Stack"
            name="tech_stack"
            initialValue={form.tech_stack}
            rules={[
              {
                required: true,
                message: 'Tech Stack Required!',
              },
            ]}
          >
            <TreeSelect {...treeProps} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

const mapStateToProps = state => {
  console.log(state);
  return {
    userInfo: state.user.userProfile,
  };
};

export default connect(mapStateToProps)(EditProfile);
