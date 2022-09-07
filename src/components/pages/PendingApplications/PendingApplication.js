import React, { useEffect, useState } from 'react';
import ApplicationModal from './ApplicationModal';
import { Table, Button, Tag } from 'antd';
import './PendingApplication.css';
import { getApplication } from '../../../state/actions/userProfile/getApplication';
import { connect, useDispatch } from 'react-redux';
import { batch } from 'react-redux';

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
  },
];

const PendingApplications = ({ applicationProfile }) => {
  const dispatch = useDispatch();

  const [applications, setApplications] = useState([]);
  const [displayModal, setDisplayModal] = useState(false);
  const [profileId, setProfileId] = useState('');

  const showModal = profile_id => {
    setProfileId(profile_id);
    setDisplayModal(true);
  };

  /**
   * Author: Khaleel Musleh
   * @Variable {dispatch} Variable
   * @returns dispatch API calls
   * Changed Axios api call to a dispatch state slice call, Now there is no need to do an API call, dispatch for getApplication sends a post request and response gotten is
   * applications from the backend.
   */

  useEffect(() => {
    dispatch(getApplication());
    setApplications(
      Object.values(applicationProfile).map(row => ({
        key: row.profile_id,
        name: row.first_name + ' ' + row.last_name,
        role: (
          <Tag
            style={{ height: '20px', width: '20px' }}
            color={row.accepting_new_mentees === undefined ? 'orange' : 'blue'}
          >
            {row.role_name}
          </Tag>
        ),
        date:
          Date(row.created_at.slice).slice(0, 3) +
          '. ' +
          Date(row.created_at.slice).slice(4, 9) +
          ', ' +
          Date(row.created_at.slice).slice(10, 16),
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

    /**
     * @Array {applicationProfile.length >= 0} Array
     * @returns useEffect(() => {})
     * Due to the dependency array not working on any state or variable due to the rendering being faster than data fetching which is passed through state
     * I had to make a dependency array that renders once data length is 0 or higher.
     */
  }, [applicationProfile.length >= 0]);

  return (
    <>
      <h2>Pending Applications</h2>
      <ApplicationModal
        displayModal={displayModal}
        setDisplayModal={setDisplayModal}
        profileId={profileId}
        setProfileId={setProfileId}
        applicationProfile={applicationProfile}
      />
      <Table columns={columns} dataSource={applications} />
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
