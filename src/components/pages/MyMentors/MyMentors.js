import React, { useEffect, useState } from 'react';
import useAxiosWithAuth0 from '../../../hooks/useAxiosWithAuth0';
import { List } from 'antd';
import { connect } from 'react-redux';
import dummyData from '../MyMentees/data.json';

const MyMentors = props => {
  const { axiosWithAuth } = useAxiosWithAuth0();
  const { role, profile_id } = props;
  // eslint-disable-next-line no-unused-vars
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
  });

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
                  title={`${item.first_name}
                  ${item.last_name}`}
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
/*
The current implementation of redux, will need to be updated once global state is introduced. 
Ticket BL-1042 addresses this requirement
*/

const mapStateToProps = state => {
  return {
    profile_id: '802b2c6d-f222-4651-a4df-41af3d321e70',
    role: 'mentee',
  };
};

export default connect(mapStateToProps)(MyMentors);
