import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Radio } from 'antd';
import axios from 'axios';

function RenderSuperAdmin(props) {
  const { Search } = Input;

  const mockedUserList = [
    {
      name: 'Roger',
      id: 1,
      role: 'Admin',
    },
    {
      name: 'Chris',
      id: 2,
      role: 'Mentor',
    },
    {
      name: 'Dave',
      id: 3,
      role: 'Mentor',
    },
    {
      name: 'Patrick',
      id: 4,
      role: 'Mentee',
    },
    {
      name: 'Romy',
      id: 5,
      role: 'Mentee',
    },
  ];
  const [userList, setUserList] = useState(mockedUserList);
  const [searchValue, setSearchValue] = useState({ username: '', role: '' });

  // useful if use the startswith method for the search function
  const [selectedUser, setSelectedUser] = useState({
    name: '',
    id: '',
    role: '',
  });

  //get the list users for the search value
  //   useEffect(() => {
  //       axios.get( getTheAPIAddress...,   searchValue)
  //         .then(res => setUserList(res.data))
  //         .catch(err => console.log(err.message));
  //   },[]);

  const searchUser = () => {
    // axios.get( getTheAPIAddress...,   searchValue)
    //     .then(res => setUserList(res.data))
    //     .catch(err => console.log(err.message));
  };

  const handleSearchChange = e => {
    setSearchValue({
      ...searchValue,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const selectUser = user => {
    setSelectedUser(user);
    return false;
  };

  const modifyUser = e => {
    setSelectedUser({
      ...selectedUser,
      [e.target.name]: e.target.value,
    });
  };

  const cancelChanges = () => {
    const user = userList.filter(use => use.id === selectedUser.id)[0];
    setSelectedUser(user);
  };

  return (
    <>
      <h1> SuperAdmin Page!</h1>
      <Search
        name="username"
        placeholder="username"
        onSearch={searchUser}
        value={searchValue.username}
        onChange={handleSearchChange}
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
        <Radio value="Mentor">Mentor</Radio>
        <Radio value="Mentee">Mentee</Radio>
        <Radio value="Admin">Admin</Radio>
        <Radio value="">All</Radio>
      </Radio.Group>

      <ul>
        {userList.map(user => {
          if (
            user.name.startsWith(searchValue.username) &&
            user.role.startsWith(searchValue.role)
          ) {
            return (
              <li>
                <Button type="link" onClick={() => selectUser(user)}>
                  {user.name}
                </Button>
              </li>
            );
          }
        })}
      </ul>

      <Form>
        <Form.Item label="Username" type="username">
          <Input
            name="name"
            placeholder="username"
            value={selectedUser.name}
            onChange={modifyUser}
          />
        </Form.Item>
        <Radio.Group
          name="role"
          onChange={modifyUser}
          value={selectedUser.role}
        >
          <Radio value="Mentor">Mentor</Radio>
          <Radio value="Mentee">Mentee</Radio>
          <Radio value="Admin">Admin</Radio>
        </Radio.Group>
        <Button type="primary" id="submitChanges">
          Update user info
        </Button>
        <Button id="cancelChanges" onClick={cancelChanges}>
          Cancel
        </Button>
        <Button danger id="delete">
          Delete User
        </Button>
      </Form>
    </>
  );
}
export default RenderSuperAdmin;
