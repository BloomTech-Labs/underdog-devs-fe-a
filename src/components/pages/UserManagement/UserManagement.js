import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../../../state/actions/allUsers/getAllUsers';
import { useDispatch, connect } from 'react-redux';
import { Table, Button, Switch, Tabs } from 'antd';
import UserModal from './UserModal';
import MatchingModal from '../MentorMenteeMatching/MatchingModal';

const UserManagement = ({ allMentors, allMentees }) => {
  const [userShow, setUserShow] = useState(false);
  const [matchShow, setMatchShow] = useState(false);
  const [user, setUser] = useState('');
  const [displayRole, setDisplayRole] = useState('Mentors');
  const dispatch = useDispatch();

  const getAccounts = role => {
    dispatch(getAllUsers(role));
  };

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
      sorter: (a, b) => a.name - b.name,
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
      title: 'Matches',
      dataIndex: 'numberOfMatches',
      defaultSortOrder: 'descend',
      filters: [
        {
          text: 'Not Matched',
          value: 'Not Matched',
        },
      ],
    },
    {
      title: 'Action',
      key: 'action',
      render: (value, record) => (
        <Button
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
    getAccounts('mentor');
    getAccounts('mentee');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h2>Manage Users</h2>
      <Switch
        checkedChildren={`${displayRole}`}
        unCheckedChildren={`${displayRole}`}
        onChange={() => handleChange()}
        defaultChecked
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
