import React, { useEffect, useState } from 'react';
import useAxiosWithAuth0 from '../../../hooks/useAxiosWithAuth0';
import { List } from 'antd';
import { connect } from 'react-redux';
import userReducer from '../../../state/reducers/userReducer';
import { setProfileId } from '../../../state/actions/auth/setProfileId';

const MyMentors = props => {
  const dummyData = [
    {
      last_name: 'Bobby',
      first_name: 'James',
      email: 'james@email.com',
    },
    {
      last_name: 'Weber',
      first_name: 'Roxanne',
      email: 'roxanne@email.com',
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
        <h2>My Mentors</h2>
        <div>
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
      </div>
    </>
  );
};

const mapStateToProps = state => {
  return {
    LastName: 'Last',
    FirstName: 'First',
    email: 'email@email.com',
    Profile: 'http://',
    profile_id: '5b36a8d6-dd73-4c11-9c42-d4c086015db2',
    role: 'mentee',
  };
};

export default connect(mapStateToProps)(MyMentors);
