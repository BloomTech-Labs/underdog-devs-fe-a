import React, { useEffect, useState } from 'react';
import useAxiosWithAuth0 from '../../../hooks/useAxiosWithAuth0';
import { Table } from 'antd';
import { connect } from 'react-redux';
import userReducer from '../../../state/reducers/userReducer';
import { setProfileId } from '../../../state/actions/auth/setProfileId';

const MyMentees = props => {
  const columns = [
    {
      title: 'First Name',
      dataIndex: 'first_name',
      key: 'first_name',
    },
    {
      title: 'last Name',
      dataIndex: 'last_name',
      key: 'last_name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
  ];

  const { axiosWithAuth } = useAxiosWithAuth0();
  const { role, profile_id } = props;
  const [data, setData] = useState([]);

  useEffect(() => {
    axiosWithAuth()
      .get(`/assignments/${role}/${profile_id}`)
      .then(res => {
        setData(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);
  return (
    <>
      <div>
        <h2>My Mentees</h2>
        <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>
          <Table columns={columns} dataSource={data} key={data.profile_id} />
        </div>
      </div>
    </>
  );
};

const mapStateToProps = state => {
  return {
    profile_id: '5b36a8d6-dd73-4c11-9c42-d4c086015db2',
    role: 'mentee',
  };
};

export default connect(mapStateToProps)(MyMentees);
