import React, { useEffect, useState } from 'react';
import useAxiosWithAuth0 from '../../../hooks/useAxiosWithAuth0';
import { List, Card } from 'antd';
import { connect } from 'react-redux';
import userReducer from '../../../state/reducers/userReducer';
import { setProfileId } from '../../../state/actions/auth/setProfileId';
import { title } from 'vega-lite/build/src/channeldef';

const MyMentors = props => {
  const columns = [
    {
      title: 'First Name',
    },
    {
      title: 'last Name',
    },
    {
      title: 'Email',
    },
    {
      title: 'Profile',
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
        <h2>My Mentor(s)</h2>
        <div>
          <List
            grid={{
              gutter: 10,
              column: 4,
            }}
            dataSource={columns}
            renderItem={item => (
              <List.Item>
                <Card title={item.title}>{data.profile_id}</Card>
              </List.Item>
            )}
          />

          {/*           
          <Table columns={columns} dataSource={data} key={data.profile_id} /> */}
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

export default connect(mapStateToProps)(MyMentors);
