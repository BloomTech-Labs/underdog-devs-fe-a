import React, { useEffect, useState } from 'react';
import axiosWithAuth from '../../../utils/axiosWithAuth';

import { Table } from 'antd';
import './PendingApplication.css';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.name - b.name,
  },
  {
    title: 'Role',
    dataIndex: 'role',
    filters: [
      {
        text: 'mentor',
        value: 'mentor',
      },
      {
        text: 'mentee',
        value: 'mentee',
      },
    ],
  },
  {
    title: 'Date',
    dataIndex: 'date',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.date - b.date,
  },
];

const PendingApplications = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const getPendingApps = () => {
      axiosWithAuth()
        .get('http://localhost:8080/application')
        .then(res => {
          setApplications(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    };
    getPendingApps();
  }, []);

  return (
    <>
      <h2>Pending Applications</h2>

      <Table columns={columns} dataSource={applications}>
        {/* <tbody>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Date</th>
          </tr> */}

        {applications.map((user, index) => {
          let date = new Date(user.created_at);
          return (
            <tr key={index}>
              <td>
                {user.first_name} {user.last_name}
              </td>
              <td>{user.role_name}</td>
              <td>{date.toString()}</td>
            </tr>
          );
        })}
        {/* </tbody> */}
      </Table>
    </>
  );
};

export default PendingApplications;
