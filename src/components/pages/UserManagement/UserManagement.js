import React, { useEffect, useState } from 'react';
import useAxiosWithAuth0 from '../../../hooks/useAxiosWithAuth0';
import { getProfile } from '../../../state/actions/userProfile/getProfile';
import { useDispatch } from 'react-redux';
import { Table, Button } from 'antd';
import MemosTable from '../../common/MemosTable';
import { API_URL } from '../../../config';
import dummyData from '../MyMentees/data.json';
import { useAuth0 } from '@auth0/auth0-react';
import UserModal from './UserModal';
import MatchingModal from '../MentorMenteeMatching/MatchingModal';
import { useHistory } from 'react-router-dom';

const UserManagement = () => {
  const [accounts, setAccounts] = useState([]);
  const [updatedProfile, setUpdatedProfile] = useState();
  const { axiosWithAuth } = useAxiosWithAuth0();
  const [userShow, setUserShow] = useState(false);
  const [matchShow, setMatchShow] = useState(false);
  const [user, setUser] = useState();
  const dispatch = useDispatch();
  const history = useHistory();
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
        >{`${record.first_name} ${record.last_name}`}</p>
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
  /**
   * Author: Khaleel Musleh
   * @param {getAccounts}
   * getAccounts dispatches a request to getProfile in state/actions/userProfile which then returns a response of either a success or error status
   */
  const getAccounts = () => {
    dispatch(getProfile())
      .then(res => {
        setAccounts(
          res.map(row => ({
            key: row.profile_id,
            email: row.email,
            role: 'Something Important',
            matches: 'Maybe',
            ...row,
          }))
        );
      })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    getAccounts();
  }, []);

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
