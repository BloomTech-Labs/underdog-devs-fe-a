import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Radio, Spin } from 'antd';
import axios from 'axios';
import '../SuperAdminForm/SuperAdminFormStyle.css';

function RenderUpdateProfile(props) {
  //base URL
  const APIBaseURI = process.env.REACT_APP_API_URI;

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
    pending: false,
  };

  //searchForm
  const [form] = Form.useForm();
  const [userList, setUserList] = useState([]);
  const [profiles, setProfiles] = useState([]);

  //modifyUserForm
  const [formProfile] = Form.useForm();
  const [user, setUser] = useState(defaultUser);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  //disable fields
  const [formDisabled, setFormDisabled] = useState(true);

  //disable buttons
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    user.id === 4 || user.profile_id === ''
      ? setFormDisabled(true)
      : setFormDisabled(false);
  }, [user]);

  async function getProfiles() {
    try {
      const res = await axios.get(`${APIBaseURI}profiles`);
      return [res[0]];
    } catch (error) {
      return [
        //dummy data for development
        {
          profile_id: '00ulzfj6nX72gu3Nh4d6',
          email: 'email@email.mail',
          first_name: 'John',
          last_name: 'Doe',
          role_id: 3,
          created_at: '2021-04-21T18:47:18.712Z',
          pending: true,
        },
      ];
    }
  }

  useEffect(() => {
    async function updateProfiles() {
      const newProfiles = await getProfiles();
      setProfiles(newProfiles);
    }
    updateProfiles();
  }, []);

  // CRUD OPERATIONS AND API CALLS
  // const searchUser = values => {
  //   axios
  //     .get(APIBaseURI, values)
  //     .then(res => setUserList(res.data))
  //     .catch(err => console.log(err.message));
  // };

  const updateUser = user => {
    // axios.get( APIUPDATEURI, user)
    //   .then(res => {
    //     setUser(defaultUser)
    //     searchUser(res)
    //})
    //   .catch(err => console.log(err.message));
  };

  const deleteUser = user => {
    // axios.get( APIDELETEURI, user)
    //   .then(res => {
    //     setUser(defaultUser)
    //     searchUser(searchValue)
    //   .catch(err => console.log(err.message));
  };

  const selectUser = user => {
    setUser(user);
    formProfile.setFieldsValue(user);
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
  const cancelChanges = () => {
    console.log('cancelChanges!');
    const found = profiles.filter(
      profile => profile.profile_id === user.profile_id
    )[0];
    setUser(found);
    formProfile.setFieldsValue(found);
  };

  //handle changes on searchForm
  const searchFormChange = () => {
    const values = form.getFieldsValue();
    const usersFound = profiles.filter(profile => {
      if (
        values.roleSearch === 5 ||
        !values.roleSearch ||
        values.roleSearch === undefined
      ) {
        if (profile.first_name.startsWith(values.usernameSearch)) {
          return true;
        } else {
          return false;
        }
      } else {
        if (
          profile.first_name.startsWith(values.usernameSearch) &&
          profile.role_id === values.roleSearch
        ) {
          return true;
        } else {
          return false;
        }
      }
    });
    usersFound.length > 0 ? setUserList(usersFound) : setUserList([]);
  };

  return (
    <>
      <div className="flexContainer">
        <h1> Update profile Page!</h1>
        {profiles.length > 0 ? (
          <Form
            {...formItemLayout}
            form={form}
            name="search"
            onChange={searchFormChange}
            scrollToFirstError
          >
            <Form.Item
              name="usernameSearch"
              label="Username"
              placeholder="username"
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
                  <Button type="link" onClick={() => selectUser(profile)}>
                    {`${profile.first_name} ${profile.last_name}`}
                  </Button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
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
          {/* TODO: define which field should be kept or discarded */}
          {/* <Form.Item
            name="username"
            label="Username"
            placeholder="username"
            value={user.username}
            rules={[
              {
                required: true,
                message: 'Please input a username',
                whitespace: true,
              },
              {
                message: 'The username must be at least 2 characters long',
                pattern: new RegExp(/[a-z]{2}/gi),
                whitespace: true,
              },
            ]}
          >
            <Input disabled={formDisabled} allowClear />
          </Form.Item> */}
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
          <Form.Item
            name="pending"
            label="Role approved"
            rules={[
              {
                required: true,
                message: 'Please select a role',
              },
            ]}
          >
            <Radio.Group
              name="pending"
              disabled={formDisabled}
              style={{ display: 'flex', margin: 'auto' }}
            >
              <Radio value={true}>approved</Radio>
              <Radio value={false}>pending</Radio>
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
            <Button id="cancelChanges" onClick={() => cancelChanges()}>
              Revert changes
            </Button>
            <Button
              danger
              id="delete"
              disabled={isDisabled}
              onClick={() => deleteUser(user)}
            >
              Delete User
            </Button>
          </div>
        </Form>
      </div>
      <p className="feedbackMessage">{feedbackMessage}</p>
    </>
  );
}
export default RenderUpdateProfile;
