import React, { useEffect, useState } from 'react';
import axiosWithAuth from '../../../utils/axiosWithAuth';
import ApplicationModal from './ApplicationModal';
import { Table, Button, Tag } from 'antd';
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
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Application',
    dataIndex: 'button',
    key: 'button',
  },
];

const PendingApplications = () => {
  const [applications, setApplications] = useState([]);
  const [displayModal, setDisplayModal] = useState(false);
  const [profileId, setProfileId] = useState('');

  const showModal = profile_id => {
    setProfileId(profile_id);
    setDisplayModal(true);
  };

  useEffect(() => {
    const getPendingApps = () => {
      axiosWithAuth()
        .get('/application')
        .then(res => {
          setApplications(
            res.data.map(row => ({
              key: row.profile_id,
              name: row.first_name + ' ' + row.last_name,
              role: (
                <Tag color={row.role_name === 'mentor' ? 'blue' : 'orange'}>
                  {row.role_name}
                </Tag>
              ),
              date:
                Date(row.created_at.slice).slice(0, 3) +
                '. ' +
                Date(row.created_at.slice).slice(4, 9) +
                ', ' +
                Date(row.created_at.slice).slice(10, 16),
               email: <a href={row.email}>{row.email}</a>,
              button: (
                <Button
                  type="primary"
                  id={row.profile_id}
                  onClick={() => showModal(row.profile_id)}
                >
                  Review Application
                </Button>
              ),
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
      <ApplicationModal
        displayModal={displayModal}
        setDisplayModal={setDisplayModal}
        profileId={profileId}
        setProfileId={setProfileId}
      />
      <Table columns={columns} dataSource={applications} />
    </>
  );
};

export default PendingApplications;
