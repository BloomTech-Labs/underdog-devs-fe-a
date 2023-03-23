import React, { useEffect, useState } from 'react';
import { getProfile } from '../../../state/actions/userProfile/getProfile';
import { useDispatch } from 'react-redux';
import { Table, Button, Tag } from 'antd';
import { API_URL } from '../../../config';
import UserModal from './UserModal';
import MatchingModal from '../MentorMenteeMatching/MatchingModal';

const UserManagement = () => {
  const [accounts, setAccounts] = useState([]);
  const [userShow, setUserShow] = useState(false);
  const [matchShow, setMatchShow] = useState(false);
  const [user, setUser] = useState();
  const dispatch = useDispatch();

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
          style={{ color: '#2c90ff' }}
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
      dataIndex: 'matches',
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
    getAccounts();
  });

  const getAccounts = () => {
    dispatch(getProfile('mentee'))
      .then(res => {
        setAccounts(
          res.map((row, idx) => ({
            key: idx,
            email: row.mentee.email,
            role: 'mentee',
            matches: row.mentor.length || <Tag color={'red'}>Not Matched</Tag>,
            ...row.mentee,
          }))
        );
      })
      .catch(err => console.error(err));
  };
  return (
    <>
      <h2>Manage Users</h2>
      <Table columns={columns} dataSource={accounts} />
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
export default UserManagement;
