import React, { useEffect, useState } from 'react';
import axiosWithAuth from '../../../utils/axiosWithAuth';

import { Table } from 'antd';
import './PendingApplication.css';

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
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.date - b.date,
  },
];

const PendingApplications = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const getPendingApps = () => {
      axiosWithAuth()
        .get('/application')
        .then(res => {
          setApplications(
            res.data.map(row => ({
              key: row.profile_id,
              name: row.first_name + ' ' + row.last_name,
              role: row.role_name,
              date: Date(row.created_at),
              notes: 'this is a note',
            }))
          );
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

      <Table
        columns={columns}
        dataSource={applications}
        expandable={{
          expandedRowRender: record => (
            <p style={{ margin: 0 }}>{record.notes}</p>
          ),
        }}
      />
    </>
  );
};

export default PendingApplications;
