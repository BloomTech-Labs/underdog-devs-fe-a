import React, { useEffect, useState } from 'react';
import useAxiosWithAuth0 from '../../../hooks/useAxiosWithAuth0';
import { Table } from 'antd';

const MyMentees = props => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Profile',
      dataIndex: 'profile',
      key: 'profile',
    },
  ];

  const [role, setRole] = useState('');
  const { axiosWithAuth } = useAxiosWithAuth0();

  const getMentor = () => {
    const { profileId, role } = props;

    axiosWithAuth()
      .get(`/assignments/${role}/${profileId}`)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  };

  useEffect(() => {
    getMentor();
  }, []);

  return (
    <>
      <div>
        <h2>My Mentees</h2>
        <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>
          <Table columns={columns} />
        </div>
      </div>
    </>
  );
};

export default MyMentees;
