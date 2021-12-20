import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Radio, Spin, Modal } from 'antd';
import '../SuperAdminForm/SuperAdminFormStyle.css';
import axiosWithAuth from '../../../utils/axiosWithAuth.js';

function RenderUserManagement(props) {
  //Antd design settings
  const formItemLayout = {
    labelCol: {
      sm: {
        span: 6,
      },
    },
    wrapperCol: {
      sm: {
        span: 16,
      },
    },
  };

  //formProfile management
  const defaultUser = {
    profile_id: '',
    email: '',
    first_name: '',
    last_name: '',
    role_id: '',
    created_at: '',
    is_active: null,
  };

  //searchForm
  const [form] = Form.useForm();
  const [userList, setUserList] = useState([]);
  const [profiles, setProfiles] = useState([]);
  //modifyUserForm
  const [formProfile] = Form.useForm();
  const [user, setUser] = useState(defaultUser);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  //disable fields
  const [formDisabled, setFormDisabled] = useState(true);

  //disable buttons
  const [isDisabled, setIsDisabled] = useState(true);

  async function getProfiles() {
    try {
      const res = await axiosWithAuth().get('/profiles');
      console.log(res);
      setProfiles(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getProfiles();
  }, []);

  //handle Modal
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const updateUser = async user => {
    try {
      const res = await axiosWithAuth().put('/profiles', user);
      setUser(res.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  const deactivateUser = async user => {
    try {
      axiosWithAuth().put(`/profiles/is_active/${user.profile_id}`);
      setIsModalVisible(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  const selectUser = async user => {
    setFormDisabled(false);
    setUser(user);
    console.log(user);
    formProfile.setFieldsValue(user);
    const validating = await validateForm(formProfile);
    setIsDisabled(!validating);
  };

  //form validation
  async function validateForm(formToValidate) {
    try {
      await formToValidate.validateFields();
      return true;
    } catch (error) {
      return false;
    }
  }

  //handle changes on formProfile
  const modifyUser = async ({ target }) => {
    const validating = await validateForm(formProfile);
    setIsDisabled(!validating);
    const { name, value } = target;
    const val = name === 'role_id' || name === 'pending' ? value : value.trim();
    // userForm(name, val);
    setUser({
      ...user,
      [name]: val,
    });
  };

  //handle clicks on cancel button
  const cancelChanges = async () => {
    const found = profiles.filter(
      profile => profile.profile_id === user.profile_id
    )[0];
    setUser(found);
    formProfile.setFieldsValue(found);
    const validating = await validateForm(formProfile);
    setIsDisabled(!validating);
  };

  //handle changes on searchForm
  const searchFormChange = () => {
    const values = form.getFieldsValue();
    const usersFound = profiles.filter(profile => {
      const filters =
        profile.first_name.startsWith(values.firstNameSearch) &&
        profile.last_name.startsWith(values.lastNameSearch) &&
        profile.email.startsWith(values.emailSearch);
      return values.roleSearch === 5
        ? filters
        : filters && profile.role_id === values.roleSearch;
    });
    usersFound.length > 0 ? setUserList(usersFound) : setUserList([]);
  };
  // TODO: Further Security checks need to be thought out and implemented. For example: An admin shouldnt be able to access and update a super-admin's profile
  return (
    <>
      <div className="flexContainer">
        <h1> User Management </h1>
        {profiles.length > 0 ? (
          <Form
            {...formItemLayout}
            form={form}
            name="search"
            initialValues={{
              firstNameSearch: '',
              lastNameSearch: '',
              emailSearch: '',
              roleSearch: 5,
            }}
            onChange={searchFormChange}
            scrollToFirstError
          >
            <Form.Item
              name="firstNameSearch"
              label="First Name"
              placeholder="First Name"
              rules={
                [
                  //TODO add form verification for input format if needed
                ]
              }
              className="item"
            >
              <Input allowClear />
            </Form.Item>
            <Form.Item
              name="lastNameSearch"
              label="Last Name"
              placeholder="Last Name"
              rules={
                [
                  //TODO add form verification for input format if needed
                ]
              }
              className="item"
            >
              <Input allowClear />
            </Form.Item>
            <Form.Item
              name="emailSearch"
              label="email"
              placeholder="email"
              rules={
                [
                  //TODO add form verification for input format if needed
                ]
              }
              className="item"
            >
              <Input allowClear />
            </Form.Item>
            <Form.Item
              name="roleSearch"
              label="Role"
              rules={
                [
                  //TODO: implement this part if some rule are needed for form verification
                ]
              }
            >
              <Radio.Group
                name="roleSearch"
                style={{ display: 'flex', margin: 'auto' }}
                defaultValue={5}
              >
                <Radio value={1}>Mentor</Radio>
                <Radio value={2}>Mentee</Radio>
                <Radio value={3}>Admin</Radio>
                <Radio value={4}>superAdmin</Radio>
                <Radio value={5} defaultChecked>
                  All
                </Radio>
              </Radio.Group>
            </Form.Item>
          </Form>
        ) : (
          <>
            {' '}
            <Spin /> <p style={{ textAlign: 'center' }}>
              Loading profiles...
            </p>{' '}
          </>
        )}
        {userList.length > 0 && (
          <ul>
            {userList.map(profile => {
              return (
                <li key={profile.profile_id}>
                  <Button
                    type="link"
                    onClick={() => {
                      selectUser(profile);
                    }}
                  >
                    {`${profile.first_name} ${profile.last_name}`}
                  </Button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
      {!formDisabled && (
        <div className="flexContainer">
          <Form
            {...formItemLayout}
            onChange={modifyUser}
            style={{ marginTop: '15px' }}
            form={formProfile}
            name="search"
            initialValues={{
              prefix: '1',
            }}
            scrollToFirstError
          >
            <Form.Item
              name="first_name"
              label="First Name"
              placeholder="First Name"
              rules={
                [
                  //TODO: implement this part if some rule are needed for form verification
                ]
              }
            >
              <Input name="first_name" disabled={formDisabled} allowClear />
            </Form.Item>
            <Form.Item
              name="last_name"
              label="Last Name"
              placeholder="Last Name"
              rules={
                [
                  //TODO: implement this part if some rule are needed for form verification
                ]
              }
            >
              <Input name="last_name" disabled={formDisabled} allowClear />
            </Form.Item>
            <Form.Item
              name="email"
              label="E-mail"
              rules={[
                {
                  required: true,
                  message: 'Please input an E-mail!',
                },
                {
                  type: 'email',
                  message: 'The input is not a valid E-mail!',
                },
              ]}
            >
              <Input name="email" className="field" disabled={formDisabled} />
            </Form.Item>
            <Form.Item
              name="role_id"
              label="Role"
              rules={[
                {
                  required: true,
                  message: 'Please select a role',
                },
              ]}
            >
              <Radio.Group
                name="role_id"
                disabled={formDisabled}
                style={{ display: 'flex', margin: 'auto' }}
              >
                <Radio value={1}>Mentor</Radio>
                <Radio value={2}>Mentee</Radio>
                <Radio value={3}>Admin</Radio>
                <Radio value={4} disabled={true}>
                  superAdmin
                </Radio>
              </Radio.Group>
            </Form.Item>
            <div className="buttonGroup">
              <Button
                type="primary"
                id="submitChanges"
                disabled={isDisabled}
                onClick={() => updateUser(user)}
              >
                Update user info
              </Button>
              <Button id="cancelChanges" onClick={cancelChanges}>
                Revert changes
              </Button>
              {/* TODO: Dynamically change the button and modal from "Disable User" to "Reactivate User" depending on is_active status */}
              <Button
                danger
                id="delete"
                disabled={isDisabled}
                onClick={showModal}
              >
                Disable User
              </Button>
              <Modal
                title="Basic Modal"
                visible={isModalVisible}
                onOk={() => deactivateUser(user)}
                onCancel={handleCancel}
              >
                <p>You are about to disable a user</p>
              </Modal>
            </div>
          </Form>
        </div>
      )}
      {/* TODO: Set up dynamic feedback messages based on actions of the user */}
      <p className="feedbackMessage">{feedbackMessage}</p>
    </>
  );
}
export default RenderUserManagement;
