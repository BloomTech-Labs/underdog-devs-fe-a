import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Radio } from 'antd';
import * as yup from 'yup';
import schema from './formValidation';
import axios from 'axios';
import '../SuperAdminForm/SuperAdminFormStyle.css';

function RenderUpdateProfile(props) {
  const { Search } = Input;

  const APIGETURI = '';
  const APIDELETEURI = '';
  const APIUPDATEURI = '';

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
  const tailFormItemLayout = {
    wrapperCol: {
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

  //form management
  const formErrors = {
    username: '',
    lastName: '',
    firstName: '',
    email: '',
    role: '',
  };

  const defaultUser = {
    username: '',
    lastName: '',
    firstName: '',
    email: '',
    role: '',
    id: '',
  };

  const [form] = Form.useForm();
  const [formProfile] = Form.useForm();
  //form control
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [formDisabled, setFormDisabled] = useState(true);
  const [errorUser, setErrorUser] = useState(formErrors);
  const [user, setUser] = useState(defaultUser);
  const [isDisabled, setIsDisabled] = useState(true);
  const [profiles, setProfiles] = useState([]);

  //search bar and result
  const [userList, setUserList] = useState([]);
  const [searchValue, setSearchValue] = useState({ username: '', role: '' });

  useEffect(() => {
    user.id === 4 || user.id === ''
      ? setFormDisabled(true)
      : setFormDisabled(false);
  }, [user]);

  useEffect(() => {
    axios
      .get(`${APIGETURI}/profiles`)
      .then(res => setProfiles(res.data))
      .catch(err =>
        setProfiles([
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
        ])
      ); //`could not get users profiles, an error occurred: ${err.message}`
  }, []);
  //form validation
  // useEffect(() => {
  //   schema.isValid(user).then(valid => setIsDisabled(!valid));
  // }, [user]);

  // const userForm = (name, value) => {
  //   yup
  //     .reach(schema, name)
  //     .validate(value)
  //     .then(() => {
  //       setErrorUser({ ...errorUser, [name]: '' });
  //     })
  //     .catch(err => {
  //       setErrorUser({ ...errorUser, [name]: err.message });
  //     });
  //   setUser({
  //     ...user,
  //     [name]: value,
  //   });
  // };

  // CRUD OPERATIONS AND API CALLS
  const searchUser = values => {
    axios
      .get(APIGETURI, values)
      .then(res => setUserList(res.data))
      .catch(err => console.log(err.message));
  };

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
    return false;
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

  //handle search from formSearch
  async function onFinishSearch(values) {
    console.log('onFinishSearch', values);
    const userToFind = {};
    const res = await searchUser(userToFind);
  }

  const searchFormChange = () => {
    console.log('profiles type', typeof profiles);
    console.log('profiles', profiles);

    const values = form.getFieldsValue();
    const usersFound = profiles.filter(profile => {
      if (values.searchUsername === 5 || !values.searchUsername) {
        console.log('ok');
        return profile.username === values.first_name;
      } else {
        console.log('Noooooo');
        return (
          profile.first_name === values.searchUsername &&
          profile.role_id === values.roleSearch
        );
      }
    });
    setProfiles(usersFound);
  };

  return (
    <>
      <div className="flexContainer">
        <h1> Update profile Page!</h1>
        <Form
          {...formItemLayout}
          form={form}
          name="search"
          onFinish={onFinishSearch}
          onChange={searchFormChange}
          initialValues={{
            prefix: '1',
          }}
          scrollToFirstError
        >
          <Form.Item
            name="usernameSearch"
            label="username"
            placeholder="username"
            rules={
              [
                //TODO add form verification for input format if needed
              ]
            }
            className="item"
          >
            <Search
              onSearch={() => searchUser(searchValue)}
              value={searchValue.username}
              // onChange={handleSearchChange}
              enterButton
              allowClear
            />
          </Form.Item>
          <Form.Item
            name="roleSearch"
            label="Role"
            rules={[
              {
                required: true,
                message: 'Please select a role',
              },
            ]}
          >
            <Radio.Group
              name="roleSearch"
              // onChange={handleSearchChange}
              value={searchValue.role}
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
        <ul>
          {userList.map(user => {
            return (
              <li>
                <Button type="link" onClick={() => selectUser(user)}>
                  {user.username}
                </Button>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="flexContainer">
        <Form
          {...formItemLayout}
          style={{ marginTop: '15px' }}
          form={formProfile}
          name="search"
          // onFinish={onFinish}
          // onChange={formChange}
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
            <Input disabled={formDisabled} enterButton allowClear />
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
            <Input disabled={formDisabled} enterButton allowClear />
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
            <Input disabled={formDisabled} enterButton allowClear />
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
