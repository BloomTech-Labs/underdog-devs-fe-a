import React, { useEffect, useState } from 'react';
import axiosWithAuth from '../../../utils/axiosWithAuth';

import { Table, Modal, Button } from 'antd';
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
    title: 'Application',
    dataIndex: 'button',
    key: 'button',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.date - b.date,
  },
];

const PendingApplications = () => {
  const [applications, setApplications] = useState([]);
  const [displayModal, setDisplayModal] = useState(false);
  const [currentApplication, setCurrentApplication] = useState({});
  const [profileId, setProfileId] = useState('');

  const showModal = profile_id => {
    setProfileId(profile_id);
    // getCurrentApp();
    setDisplayModal(true);
  };

  const handleOk = () => {
    setDisplayModal(false);
    console.log(currentApplication);
    console.log(profileId);
  };

  const handleCancel = () => {
    setDisplayModal(false);
  };

  useEffect(() => {
    const getCurrentApp = () => {
      axiosWithAuth()
        .get(`/application/profileId/${profileId}`)
        .then(res => {
          setCurrentApplication(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    };
    getCurrentApp();
  }, [profileId]);

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
          console.log(res.data);
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

      <Modal
        title="Application Modal"
        visible={displayModal}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose={true}
      >
        <h3>{`${currentApplication.first_name} ${currentApplication.last_name}`}</h3>
        Can commit: {`${currentApplication.can_commit === true ? 'yes' : 'no'}`}
        <br></br>
        Submission Date: {currentApplication.created_at}
        <br></br>
        Current Employer: {currentApplication.current_comp}
        <br></br>
        Email: {currentApplication.email}
        <br></br>
        Availability: {currentApplication.how_commit}
        <br></br>
        Location: {currentApplication.location}
        <br></br>
        Progress Status: {currentApplication.progress_status}
        <br></br>
        Role: {currentApplication.role_name}
        <br></br>
        Tech Stack: {currentApplication.tech_stack}
        <br></br>
        Notes: {currentApplication.other_info}
        <br></br>
      </Modal>
      <Table
        columns={columns}
        dataSource={applications}
        expandable={{
          expandedRowRender: record => (
            <div>
              <p style={{ margin: 0 }}>{record.name}</p>
            </div>
          ),
        }}
      />
    </>
  );
};

export default PendingApplications;
