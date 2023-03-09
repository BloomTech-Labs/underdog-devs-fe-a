import React, { useEffect, useState } from 'react';
import useAxiosWithAuth0 from '../../../hooks/useAxiosWithAuth0';
import { getProfile } from '../../../state/actions/userProfile/getProfile';
import { useDispatch } from 'react-redux';
import { Table, Button } from 'antd';
import { API_URL } from '../../../config';
import UserModal from './UserModal';
import MatchingModal from '../MentorMenteeMatching/MatchingModal';

const UserManagement = () => {
  const [accounts, setAccounts] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [updatedProfile, setUpdatedProfile] = useState();
  const [userShow, setUserShow] = useState(false);
  const [matchShow, setMatchShow] = useState(false);
  const [user, setUser] = useState();
  const [displayRole, setDisplayRole] = useState('mentor');
  const { axiosWithAuth } = useAxiosWithAuth0();
  const dispatch = useDispatch();
  const columns = [
    {
      title: 'Name',
      dataIndex: 'first_name',
      key: 'first_name',
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
        >{`${record.mentor.first_name} ${record.mentor.last_name}`}</p>
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
  // eslint-disable-next-line no-unused-vars
  function updateToAdmin(record) {
    const requestBody = {
      role_id: 2,
    };
    axiosWithAuth()
      .put(`${API_URL}profile/${record.key}`, requestBody)
      .then(res => {
        setUpdatedProfile(res);
      })
      .catch(err => console.error(err));
  }

  useEffect(() => {
    getAccounts();
  });

  const getAccounts = () => {
    // if (displayRole === 'mentee') {
    //   dispatch(getProfile('mentee'))
    //     .then(res => {
    //       console.log(`RES`, res);
    //       setAccounts(
    //         res.map(row => ({
    //           key: row.mentee.profile_id,
    //           email: row.mentee.email,
    //           role: 'mentee',
    //           matches: row.mentor.length,
    //           ...row.mentee,
    //         }))
    //       );
    //     })
    //     .catch(err => console.error(err));
    // } else {
    dispatch(getProfile('mentor'))
      .then(res => {
        console.log(`RES`, res);
        setAccounts(
          res.map(row => ({
            name: `${row.mentor.first_name} ${row.mentor.last_name}`,
            email: row.mentor.email,
            role: 'mentor',
            matches: row.mentees.length,
          }))
        );
        console.log(`Accounts`, accounts);
      })
      .catch(err => console.error(err));
    // }
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
};
export default UserManagement;
