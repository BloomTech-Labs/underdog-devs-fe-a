import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Radio } from 'antd';
import * as yup from 'yup';
import schema from './formValidation';
import axios from 'axios';

function RenderUpdateProfile(props) {
  const { Search } = Input;

  const APIGETURI = '';
  const APIDELETEURI = '';
  const APIUPDATEURI = '';

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

  const [errorUser, setErrorUser] = useState(formErrors);
  const [user, setUser] = useState(defaultUser);
  const [isDisabled, setIsDisabled] = useState(true);

  //search bar and result
  const [userList, setUserList] = useState([]);
  const [searchValue, setSearchValue] = useState({ username: '', role: '' });

  //form validation
  useEffect(() => {
    schema.isValid(user).then(valid => setIsDisabled(!valid));
  }, [user]);

  const userForm = (name, value) => {
    yup
      .reach(schema, name)
      .validate(value)
      .then(() => {
        setErrorUser({ ...errorUser, [name]: '' });
      })
      .catch(err => {
        setErrorUser({ ...errorUser, [name]: err.message });
      });
    setUser({
      ...user,
      [name]: value,
    });
  };

  // CRUD OPERATIONS AND API CALLS
  const searchUser = search => {
    // axios.get( APIGETURI, search)
    //   .then(res => setUserList(res.data))
    //   .catch(err => console.log(err.message));
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

  const handleSearchChange = e => {
    const value =
      e.target.name !== 'role' ? e.target.value.trim() : e.target.value;
    setSearchValue({
      ...searchValue,
      [e.target.name]: value,
    });
  };

  const selectUser = user => {
    setUser(user);
    return false;
  };

  const modifyUser = ({ target }) => {
    const { name, value } = target;
    const val = name === 'role' ? value : value.trim();
    userForm(name, val);
    setUser({
      ...user,
      [name]: val,
    });
  };

  const cancelChanges = () => {
    const user = userList.filter(use => use.id === user.id)[0];
    setUser(user);
  };

  return (
    <>
      <h1> Update profile Page!</h1>
      <Search
        name="username"
        placeholder="username"
        onSearch={() => searchUser(searchValue)}
        value={searchValue.username}
        onChange={handleSearchChange}
        style={{ width: 200 }}
        enterButton
        allowClear
      />

      {/* <Input 
        name="username" 
        placeholder="enter the username you're looking for" 
        allowClear 
        onChange={searchUser} 
        value={searchValue.name}
    /> */}

      <Radio.Group
        name="role"
        onChange={handleSearchChange}
        value={searchValue.role}
      >
        <Radio value={1}>Mentor</Radio>
        <Radio value={2}>Mentee</Radio>
        <Radio value={3}>Admin</Radio>
        <Radio value={4}>superAdmin</Radio>
        <Radio value={5}>All</Radio>
      </Radio.Group>

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

      <Form>
        <fieldset disabled={user.role === 4 || !user.id}>
          <Form.Item label="Username" type="username">
            <p>{errorUser.username}</p>
            <Input
              name="username"
              placeholder="username"
              value={user.username}
              onChange={modifyUser}
              style={{ width: 200 }}
            />
          </Form.Item>
          <Form.Item label="First Name">
            <p>{errorUser.firstName}</p>
            <Input
              name="firstName"
              placeholder="First Name"
              value={user.firstName}
              onChange={modifyUser}
              style={{ width: 200 }}
            />
          </Form.Item>
          <Form.Item label="Last Name">
            <p>{errorUser.lastName}</p>
            <Input
              name="lastName"
              placeholder="Last Name"
              value={user.lastName}
              onChange={modifyUser}
              style={{ width: 200 }}
            />
          </Form.Item>
          <Form.Item label="email" type="email">
            <p>{errorUser.email}</p>
            <Input
              name="email"
              placeholder="myemail@provider.com"
              value={user.email}
              onChange={modifyUser}
              style={{ width: 200 }}
            />
          </Form.Item>
          <Radio.Group name="role" onChange={modifyUser} value={user.role}>
            <Radio value={1}>Mentor</Radio>
            <Radio value={2}>Mentee</Radio>
            <Radio value={3}>Admin</Radio>
            <Radio value={4} disabled={true}>
              superAdmin
            </Radio>
          </Radio.Group>
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
        </fieldset>
      </Form>
    </>
  );
}
export default RenderUpdateProfile;
