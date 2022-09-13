import React, { useEffect, useState } from 'react';
import ApplicationModal from './ApplicationModal';
import { Table, Button, Tag } from 'antd';
import { getApplication } from '../../../state/actions/userProfile/getApplication';
import { connect, useDispatch } from 'react-redux';
// import { batch } from 'react-redux';

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
  {
    title: 'Date Updated',
    dataIndex: 'date',
    key: 'date',
    sorter: (a, b) => a.date.localeCompare(b.date),
    sortDirections: ['descend', 'ascend'],
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

const PendingApplications = ({ applicationProfile }) => {
  const dispatch = useDispatch();

  const [applications, setApplications] = useState([]);
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [profileId, setProfileId] = useState('');

  const showModal = profile_id => {
    setProfileId(profile_id);
    setModalIsVisible(true);
  };

  const getPendingApps = () => {
    dispatch(getApplication());
    setApplications(
      Object.values(applicationProfile).map(row => ({
        key: row.profile_id,
        name: row.first_name + ' ' + row.last_name,
        role: (
          <Tag color={row.role_name === 'mentor' ? 'blue' : 'purple'}>
            {row.role_name}
          </Tag>
        ),
        date: (row.updated_at ? row.updated_at : row.created_at).slice(0, 10),
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
  };

  useEffect(() => {
    getPendingApps();
    /**
     * @Array {applicationProfile.length >= 0} Array
     * @returns useEffect(() => {})
     * Due to the dependency array not working on any state or variable due to the rendering being faster than data fetching which is passed through state
     * I had to make a dependency array that renders once data length is 0 or higher.
     */
  }, [applicationProfile, dispatch]);

  return (
    <>
      <h2>Applications</h2>
      <ApplicationModal
        displayModal={modalIsVisible}
        setDisplayModal={setModalIsVisible}
        profileId={profileId}
        setProfileId={setProfileId}
        applicationProfile={applicationProfile}
        getPendingApps={getPendingApps}
      />
      <Table columns={columns} dataSource={applications} />;
    </>
  );
};

/**
 * @param {mapStateToProps}
 * @returns applicationProfile State
 * Connected state to pendingApplication and passed the state of applicationProfile to applicationModal.js to simplify the data process of fetching and passing rather than making
 * multiple API calls in every componend.
 */

const mapStateToProps = state => {
  return {
    applicationProfile: state.user.applicationProfile,
  };
};

export default connect(mapStateToProps)(PendingApplications);
