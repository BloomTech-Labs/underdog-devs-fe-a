import React, { useEffect, useState, useCallback } from 'react';
import useAxiosWithAuth0 from '../../../hooks/useAxiosWithAuth0';
import ApplicationModal from './ApplicationModal';
import { Table, Button, Tag, Switch } from 'antd';
import axios from 'axios';
import moment from 'moment';

const columns = [
  // Names sorting by alphabetical order
  {
    title: 'Name',
    dataIndex: 'full_name',
    key: 'full_name',
    sorter: (a, b) => a.full_name.localeCompare(b.full_name),
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
  },
  {
    // Add in functionality for filter button for roles
    title: 'Role',
    dataIndex: 'role',
    key: 'role',
    filters: [
      {
        text: 'Mentor',
        value: 'Mentor',
      },
      {
        text: 'Mentee',
        value: 'Mentee',
      },
    ],
    onFilter: (value, record) => record.role.props.children === value,
  },
  {
    title: 'Date Submitted',
    dataIndex: 'date',
    key: 'date',
    sorter: (a, b) => moment(a.date).unix() - moment(b.date).unix(),
    sortDirections: ['descend', 'ascend'],
    defaultSortOrder: 'ascend',
  },
  {
    title: 'Application',
    dataIndex: 'button',
    key: 'button',
  },
];

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [currentApplication, setCurrentApplication] = useState({});
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [profileId, setProfileId] = useState('');
  const [isToggled, setIsToggled] = useState(true);
  const { axiosWithAuth } = useAxiosWithAuth0();

  const uppercaseRole = role => {
    return role.charAt(0).toUpperCase() + role.slice(1);
  };

  const onToggle = () => {
    setIsToggled(!isToggled);
  };

  const showModal = (application, profile_id) => {
    setCurrentApplication(application);
    setProfileId(profile_id);
    setModalIsVisible(true);
  };

  const convertDate = previousDate => {
    const timestamp = new Date(previousDate);
    const newConvertedDate = timestamp.toLocaleString();
    if (newConvertedDate === 'Invalid Date') {
      return '';
    }
    return newConvertedDate;
  };

  const getApps = useCallback(async () => {
    try {
      const api = await axiosWithAuth().get(`/application`);
      api.data.forEach(row => {
        row.hasOwnProperty('accepting_new_mentees')
          ? (row.role_name = 'mentor')
          : (row.role_name = 'mentee');
      });

      if (isToggled === true) {
        setApplications(
          Object.values(api.data)
            .map(row => ({
              key: row.profile_id,
              first_name: row.first_name,
              last_name: row.last_name,
              tech_stack: row.tech_stack,
              role_name: row.role_name,
              email: row.email,
              state: row.state,
              country: row.country,
              current_position: row.current_position,
              current_company: row.current_company,
              industry_knowledge: row.industry_knowledge,
              pair_programming: row.pair_programming,
              job_help: row.job_help,
              other_info: row.other_info,
              full_name: row.first_name + ' ' + row.last_name,
              role: <p>{uppercaseRole(row.role_name)}</p>,
              date: convertDate(row.created_at),
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
              validate_status: row.validate_status,
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
                  onClick={() => showModal(row, row.profile_id)}
                >
                  Review Application
                </Button>
              ),
            }))
            .filter(record => record.status.props.children === 'pending')
        );
      } else if (isToggled === false) {
        setApplications(
          Object.values(api.data)
            .map(row => ({
              key: row.profile_id,
              first_name: row.first_name,
              last_name: row.last_name,
              tech_stack: row.tech_stack,
              role_name: row.role_name,
              email: row.email,
              state: row.state,
              country: row.country,
              current_position: row.current_position,
              current_company: row.current_company,
              industry_knowledge: row.industry_knowledge,
              pair_programming: row.pair_programming,
              profile_id: row.profile_id,
              job_help: row.job_help,
              other_info: row.other_info,
              full_name: row.first_name + ' ' + row.last_name,
              role: <p>{uppercaseRole(row.role_name)}</p>,
              date: convertDate(row.created_at),
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
              validate_status: row.validate_status,
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
                  onClick={() => showModal(row)}
                >
                  Review Application
                </Button>
              ),
            }))
            .filter(
              record =>
                record.status.props.children === 'pending' ||
                'approved' ||
                'rejected'
            )
        );
      }
    } catch (err) {
      // needs proper error handling
      console.error(err);
    }
  });

  useEffect(() => {
    getApps();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isToggled, currentApplication?.validate_status]);

  return (
    <>
      <h2>Applications</h2>
      <div className="pendingToggle">
        <span>Show only pending: </span>
        <Switch checked={isToggled} onChange={onToggle} />
      </div>
      <ApplicationModal
        displayModal={modalIsVisible}
        setDisplayModal={setModalIsVisible}
        profileId={profileId}
        setProfileId={setProfileId}
        applicationProfile={currentApplication}
        getApps={getApps}
      />
      <Table columns={columns} dataSource={applications} />
    </>
  );
};

export default Applications;
