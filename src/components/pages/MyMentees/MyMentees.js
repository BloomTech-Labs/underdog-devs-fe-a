import React, { useEffect, useState } from 'react';
import useAxiosWithAuth0 from '../../../hooks/useAxiosWithAuth0';
import { List } from 'antd';
import { connect } from 'react-redux';
import userReducer from '../../../state/reducers/userReducer';
import { setProfileId } from '../../../state/actions/auth/setProfileId';

const MyMentees = props => {
  const { axiosWithAuth } = useAxiosWithAuth0();
  const { role, profile_id } = props;
  const [data, setData] = useState([]);

  const dummyData = [
    {
      first_name: 'blah',
      last_name: 'boo',
      email: 'blahblah@blah.com',
    },
    {
      first_name: 'blah',
      last_name: 'boo',
      email: 'blahblah@blah.com',
    },
  ];

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
        <List
          itemLayout="horizontal"
          dataSource={dummyData}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                title={`${item.first_name} ${item.last_name}`}
                description={item.email}
              />
            </List.Item>
          )}
        />
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
