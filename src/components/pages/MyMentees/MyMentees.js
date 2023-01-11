import React, { useEffect, useState } from 'react';
import useAxiosWithAuth0 from '../../../hooks/useAxiosWithAuth0';
import { List } from 'antd';
import { connect } from 'react-redux';

const MyMentees = props => {
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
        <List
          itemLayout="horizontal"
          dataSource={data}
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

/*
The current implementation of redux, will need to be updated once global state is introduced. 
Ticket BL-1042 addresses this requirement
*/
const mapStateToProps = state => {
  return {
    profile_id: 'ea9ff763-71b7-4235-bc18-2b148a272a1e',
    role: 'mentor',
  };
};

export default connect(mapStateToProps)(MyMentees);
