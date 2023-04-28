import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../../../state/actions/allUsers/getAllUsers';
import { useDispatch, connect } from 'react-redux';
import { Table, Button, Tabs } from 'antd';
import UserModal from './UserModal';
import MatchingModal from '../MentorMenteeMatching/MatchingModal';

const UserManagement = ({ allMentors, allMentees }) => {
  const [userShow, setUserShow] = useState(false);
  const [matchShow, setMatchShow] = useState(false);
  const [user, setUser] = useState('');
  const [displayRole, setDisplayRole] = useState('Mentees');
  const dispatch = useDispatch();

  const handleChange = () => {
    displayRole === 'Mentors'
      ? setDisplayRole('Mentees')
      : setDisplayRole('Mentors');
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayRole]);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      defaultSortOrder: 'descend',
      // sorter: (a, b) => a.name - b.name,
      render: (value, record) => (
        <p
          className="nameLink"
          onClick={() => {
            setUser(record);
            setUserShow(true);
          }}
        >{`${record.name}`}</p>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'date',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.date - b.date,
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
          value: 'Mentor',
        },
        {
          text: 'mentee',
          value: 'Mentee',
        },
      ],
      onFilter: (value, record) => record.role.includes(value),
    },
    {
      title: 'Matches',
      dataIndex: 'numberOfMatches',
      filters: [
        {
          text: 'Not Matched',
          value: 0,
        },
      ],
    },
    {
      title: 'Action',
      key: 'action',
      render: (value, record) => (
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
          onClick={() => {
            setUser(record);
            setMatchShow(true);
          }}
        >
          Edit Matches
        </Button>
      ),
    },
  ];

  useEffect(() => {
    dispatch(getAllUsers('mentor'));
    dispatch(getAllUsers('mentee'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h2>Manage Users</h2>
      <Tabs
        type="card"
        items={[
          {
            key: '1',
            label: 'Mentees',
          },
          {
            key: '2',
            label: 'Mentors',
          },
        ]}
        defaultActiveKey="1"
        size="large"
        onChange={() => handleChange()}
      />
      <Table
        columns={columns}
        dataSource={displayRole === 'Mentors' ? allMentors : allMentees}
      />
      <UserModal
        userShow={userShow}
        handleCancel={() => setUserShow(false)}
        user={user}
      />
      <MatchingModal
        matchShow={matchShow}
        handleCancel={() => setMatchShow(false)}
        user={user}
      />
    </>
  );
};

const mapStateToProps = state => {
  return {
    allMentors: state.user.allMentors,
    allMentees: state.user.allMentees,
  };
};

export default connect(mapStateToProps)(UserManagement);
