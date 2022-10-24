import React, { useEffect, useState } from 'react';
import useAxiosWithAuth0 from '../../../hooks/useAxiosWithAuth0';
import { Table } from 'antd';
import { connect } from 'react-redux';
import userReducer from '../../../state/reducers/userReducer';
import { setProfileId } from '../../../state/actions/auth/setProfileId';

const MyMentors = props => {
  console.log(props);
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
    {
      title: 'Company',
      dataIndex: 'company',
      key: 'company',
    },
  ];

  const [role, setRole] = useState('');
  const { axiosWithAuth } = useAxiosWithAuth0();

  // const getMentee = () => {
  //   const { profile_id } = props;

  //   axiosWithAuth()
  //     .get(`/assignments/${role}/${profileId}`)
  //     .then(res => {
  //       console.log(res.data);
  //     })
  //     .catch(err => {
  //       console.error(err);
  //     });
  // };

  // useEffect(() => {
  //   getMentee();
  // }, []);

  return (
    <>
      <div>
        <h2>My Mentors</h2>
        <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>
          <Table columns={columns} />
        </div>
      </div>
    </>
  );
};

const mapStateToProps = state => {
  return {
    profile_id: state.profile_id,
  };
};

export default connect(mapStateToProps, { setProfileId })(MyMentors);
