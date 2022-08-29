import React, { useEffect, useState } from 'react';
import axiosWithAuth from '../../../utils/axiosWithAuth';
import ApplicationModal from './ApplicationModal';
import { Table, Button, Tag } from 'antd';
import './PendingApplication.css';

// Filter by status
const statusFilter = (value, record) => {
  if (Array.isArray(value)) {
    return (
      record.status.props.children === value[0] ||
      record.status.props.children === value[1] ||
      record.status.props.children === value[2]
    );
  } else {
    return record.status.props.children === value;
  }
};

const columns = [
  // Names sorting by alphabetical order
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    sorter: (a, b) => a.name.localeCompare(b.name),
    sortDirections: ['descend', 'ascend'],
  },
  {
    // Add in functionality for filter button for roles
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

  // Date data from DS needs to be updated
  {
    title: 'Date Submitted',

    dataIndex: 'date',
    key: 'date',
    defaultSortOrder: 'descend',
    // sorter: (a, b, sortOrder) => {
    //   console.log("a: ", a);
    //   console.log("b: ", b);
    //   console.log("sortOrder: ",  sortOrder)
    // }
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
      {
        text: 'show all',
        value: ['pending', 'approved', 'rejected'],
      },
    ],
    defaultFilteredValue: ['pending'],
    onFilter: (value, record) => statusFilter(value, record),
  },
  {
    title: 'Application',
    dataIndex: 'button',
    key: 'button',
  },
];

// Displays shape of table data if needed, add to Table component
// const onChange = (pagination, filters, sorter, extra) => {
//   console.log('params', pagination, filters, sorter, extra);
// };

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
                <Tag color={row.role_name === 'mentor' ? 'blue' : 'purple'}>
                  {row.role_name}
                </Tag>
              ),
              // hard-coded "Date Submitted" field values because DS field for date does not exist.
              date: Date(row.updated_at).slice(0, 15),
              status: (
                <Tag
                  color={
                    row.validate_status === 'approved'
                      ? 'green'
                      : row.validate_status === 'pending'
                      ? 'orange'
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
      <Table columns={columns} dataSource={applications} />;
    </>
  );
};

export default PendingApplications;
