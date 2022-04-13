import React, { useEffect, useState } from 'react';
import axiosWithAuth from '../../../utils/axiosWithAuth';

import { Table, Button } from 'antd';
import NotesTable from '../../common/NotesTable';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.name - b.name,
  },
  {
    title: 'Role',
    dataIndex: 'role',
    key: 'role',
    filters: [
      {
        text: 'superAdmin',
        value: 'superAdmin',
      },
      {
        text: 'admin',
        value: 'admin',
      },
      {
        text: 'mentor',
        value: 'mentor',
      },
      {
        text: 'mentee',
        value: 'mentee',
      },
    ],
    onFilter: (value, record) => record.role.includes(value),
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'date',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.date - b.date,
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <Button onClick={() => updateToAdmin(record)}>Update to Admin</Button>
    ),
  },
];

function updateToAdmin(record) {
  console.log(record);
  const requestBody = {
    role_id: 2,
  };
  axiosWithAuth()
    .put(`/profile/${record.key}`, requestBody)
    .then(res => console.log(res))
    .catch(err => console.error(err));
}

const UserManagement = () => {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const getAccounts = () => {
      axiosWithAuth()
        .get('/profile')
        .then(res => {
          setAccounts(
            res.data.map(row => ({
              key: row.profile_id,
              name: row.first_name + ' ' + row.last_name,
              role:
                row.role_id === 1
                  ? 'superAdmin'
                  : row.role_id === 2
                  ? 'admin'
                  : row.role_id === 3
                  ? 'mentor'
                  : row.role_id === 4
                  ? 'mentee'
                  : 'pending',
              email: row.email,
              notes: 'this is a note',
            }))
          );
        })
        .catch(err => {
          console.log(err);
        });
    };
    getAccounts();
  }, []);
  return (
    <>
      <h2>Manage Users</h2>

      <Table
        columns={columns}
        dataSource={accounts}
        expandable={{
          expandedRowRender: record => <NotesTable />,
        }}
      />
    </>
  );
};

export default UserManagement;
