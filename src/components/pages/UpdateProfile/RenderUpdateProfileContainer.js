import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Radio, Spin } from 'antd';
import axios from 'axios';
import '../SuperAdminForm/SuperAdminFormStyle.css';

function RenderUpdateProfile(props) {
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

  //form management
  const defaultUser = {
    username: '',
    lastName: '',
    firstName: '',
    email: '',
    role: '',
    id: '',
  };

  //searchForm
  const [form] = Form.useForm();
  const [userList, setUserList] = useState([]);
  const [profiles, setProfiles] = useState([]);

  //modifyUserForm
  const [formProfile] = Form.useForm();
  const [user, setUser] = useState(defaultUser);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [formDisabled, setFormDisabled] = useState(true);
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    user.id === 4 || user.id === ''
      ? setFormDisabled(true)
      : setFormDisabled(false);
  }, [user]);

  async function getProfiles() {
    try {
      const res = await axios.get(`${APIBaseURI}profiles`);
      return [res[0]];
    } catch (error) {
      return [
        {
          user_id: '00ulzfj6nX72gu3Nh4d6',
          email: 'email@email.mail',
          first_name: 'John',
          last_name: 'Doe',
          role_id: 3,
          role_name: 'user',
          created_at: '2021-04-21T18:47:18.712Z',
          updated_at: '2021-04-21T18:47:18.712Z',
          approved: true,
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

  useEffect(() => {
    console.log('userList', userList);
  }, [userList]);

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

  // const handleSearchChange = e => {
  //   const value =
  //     e.target.name !== 'role' ? e.target.value.trim() : e.target.value;
  //   setSearchValue({
  //     ...searchValue,
  //     [e.target.name]: value,
  //   });
  // };

  const selectUser = user => {
    setUser(user);
  };

  const modifyUser = ({ target }) => {
    const { name, value } = target;
    const val = name === 'role' ? value : value.trim();
    // userForm(name, val);
    setUser({
      ...user,
      [name]: val,
    });
  };

  const cancelChanges = () => {
    const user = userList.filter(use => use.id === user.id)[0];
    setUser(user);
  };

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
            {userList.map(user => {
              return (
                <li key={user.user_id}>
                  <Button type="link" onClick={() => selectUser(user)}>
                    {`${user.first_name} ${user.last_name}`}
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
          style={{ marginTop: '15px' }}
          form={formProfile}
          name="search"
          initialValues={{
            prefix: '1',
          }}
          scrollToFirstError
        >
          <Form.Item
            name="username"
            label="Username"
            placeholder="username"
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
          </Form.Item>
          <Form.Item
            name="firstName"
            label="First Name"
            placeholder="First Name"
            rules={
              [
                //TODO: implement this part if some rule are needed for form verification
              ]
            }
          >
            <Input disabled={formDisabled} allowClear />
          </Form.Item>
          <Form.Item
            name="lastName"
            label="Last Name"
            placeholder="Last Name"
            rules={
              [
                //TODO: implement this part if some rule are needed for form verification
              ]
            }
          >
            <Input disabled={formDisabled} allowClear />
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
            <Input className="field" disabled={formDisabled} />
          </Form.Item>
          <Form.Item
            name="role"
            label="Role"
            rules={[
              {
                required: true,
                message: 'Please select a role',
              },
            ]}
          >
            <Radio.Group
              name="role"
              onChange={modifyUser}
              value={user.role}
              disable={formDisabled}
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
              Cancel
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
