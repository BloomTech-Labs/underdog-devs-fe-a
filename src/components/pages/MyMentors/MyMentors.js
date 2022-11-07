import React, { useEffect, useState } from 'react';
import useAxiosWithAuth0 from '../../../hooks/useAxiosWithAuth0';
import { List } from 'antd';
import { connect } from 'react-redux';

const MyMentors = props => {
  const { axiosWithAuth } = useAxiosWithAuth0();

  // role and profile_id are not currently in global state
  const { role, profile_id } = props;

  // this is dummy data to act as global state for profile_ID and role

  const [data, setData] = useState([]);

  useEffect(() => {
    axiosWithAuth()
      .get(`/assignments/${role}/${profile_id}`)
      .then(res => {
        setData(res.data);
        console.log(res.data);
        console.log(res.data.profile_id);
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
            dataSource={data}
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

const mapStateToProps = state => {
  return {
    profile_id: 'ac985dd8-9164-4825-833b-aef12264db8f',
    role: 'mentee',
  };
};

export default connect(mapStateToProps)(MyMentors);
