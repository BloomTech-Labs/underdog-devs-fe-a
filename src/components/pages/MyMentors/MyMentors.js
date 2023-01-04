import React, { useEffect, useState } from 'react';
import useAxiosWithAuth0 from '../../../hooks/useAxiosWithAuth0';
import { List } from 'antd';
import { connect } from 'react-redux';

const MyMentors = props => {
  const { axiosWithAuth } = useAxiosWithAuth0();
  const { role, profile_id } = props;
  const [data, setData] = useState([]);
  const dummyData = [
    { first_name: 'Drew', last_name: 'Shurik', email: 'ashurik522@gmail.com' },
    { first_name: 'Jess', last_name: 'Williams', email: 'jw@gmail.com' },
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
  //temporary data from DSAPI, changes with every reseeding
  return {
    profile_id: 'ac985dd8-9164-4825-833b-aef12264db8f',
    role: 'mentee',
  };
};

export default connect(mapStateToProps)(MyMentors);
