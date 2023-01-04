import React, { useEffect, useState } from 'react';
import useAxiosWithAuth0 from '../../../hooks/useAxiosWithAuth0';
import { List } from 'antd';
import { connect } from 'react-redux';

const MyMentees = props => {
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

/*
The current implementation of redux, will need to be updated once global state is introduced. 
Ticket BL-1042 addresses this requirement
*/
const mapStateToProps = state => {
  return {
    //temporary data from DSAPI, changes with every reseeding
    profile_id: '601d51ed-6016-4fa9-ae49-fe50b082e8c3',
    role: 'mentor',
  };
};

export default connect(mapStateToProps)(MyMentees);
