import React, { useEffect, useState } from 'react';
import axiosWithAuth from '../../../utils/axiosWithAuth';
import ApplicationModal from './ApplicationModal';
import { Table, Button, Tag } from 'antd';
import './PendingApplication.css';

// Author Charles M Johnson lines(7 - 69). These lines the application table functionallity, filtering, and sorting by alphabetical order. Tan;e renders on line 154 8/24/2022
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    sorter: (a, b) => a.name.localeCompare(b.name),
    sortDirections: ['descend', 'ascend'],
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
    onFilter: (value, record) => record.role.props.children === value,
  },
  {
    title: 'Date Submitted',

    dataIndex: 'date',
    key: 'date',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.date - b.date,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    filters: [
      {
        text: 'pending',
        value: 'pending',
      },
      {
        text: 'approved',
        value: 'approved',
      },
      {
        text: 'rejected',
        value: 'rejected',
      },
    ],
    onFilter: (value, record) => record.status.props.children === value,
  },
  {
    title: 'Application',
    dataIndex: 'button',
    key: 'button',
  },
];

const onChange = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};

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
        .post('/application')
        .then(res => {
          console.log(res);
          res.data.users.forEach(row => {
            row.hasOwnProperty('accepting_new_mentees')
              ? (row.role_name = 'mentor')
              : (row.role_name = 'mentee');
          });
          setApplications(
            res.data.users.map(row => ({
              key: row.profile_id,
              name: row.first_name + ' ' + row.last_name,
              role: (
                <Tag color={row.role_name === 'mentor' ? 'blue' : 'orange'}>
                  {row.role_name}
                </Tag>
              ),
              date:
                Date(row.created_at).slice(0, 3) +
                '. ' +
                Date(row.created_at).slice(4, 9) +
                ', ' +
                Date(row.created_at).slice(10, 16),
              status: (
                <Tag
                  color={
                    row.validate_status === 'approved'
                      ? 'green'
                      : row.validate_status === 'pending'
                      ? 'purple'
                      : 'red'
                  }
                >
                  {row.validate_status}
                </Tag>
              ),
              button: (
                <Button
                  style={{
                    backgroundImage:
                      'linear-gradient(-180deg, #37AEE2 0%, #1E96C8 100%)',
                    borderRadius: '.5rem',
                    boxSizing: 'border-box',
                    color: '#FFFFFF',
                    display: 'flex',
                    fontSize: '16px',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    touchAction: 'manipulation',
                  }}
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
      <h2>Applications</h2>
      <ApplicationModal
        displayModal={displayModal}
        setDisplayModal={setDisplayModal}
        profileId={profileId}
        setProfileId={setProfileId}
      />
      <Table columns={columns} dataSource={applications} onChange={onChange} />;
      {/* <Table columns={columns} dataSource={applications} /> */}
    </>
  );
};

export default PendingApplications;
