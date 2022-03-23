import React, { useState, useEffect } from 'react';
import { Button, Avatar, Card, Comment, Table } from 'antd';
import { columns } from './NoteUtils';
import axiosWithAuth from '../../../utils/axiosWithAuth';
import { connect } from 'react-redux';

const NotesTable = ({ userProfile }) => {
  console.log(userProfile);
  const [data, setData] = useState([]);
  // Get profile_id of logged in user
  const { profile_id } = userProfile;
  // Get profile_id of note creator
  const note_profile_id = data.map(data => data.profile_id);

  // Dummy data for table
  useEffect(() => {
    axiosWithAuth()
      .get('https://mocki.io/v1/d52d79b6-7bc3-4fdb-8aea-25140c9a1041')
      .then(res => {
        setData(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <Table
      columns={columns}
      dataSource={data}
      expandable={{
        expandedRowRender: record => (
          <>
            <Card style={{ marginBottom: '1%' }}>
              <>
                <Comment
                  actions={[
                    profile_id === note_profile_id ? (
                      <Button type="primary" size="middle">
                        Edit
                      </Button>
                    ) : (
                      <Button
                        key="comment-nested-reply-to"
                        type="primary"
                        size="middle"
                      >
                        Reply
                      </Button>
                    ),
                  ]}
                  author={record.createdBy}
                  avatar={
                    <Avatar
                      src="https://joeschmoe.io/api/v1/random"
                      alt={record.createdBy}
                    />
                  }
                  content={<p>{record.note}</p>}
                ></Comment>
              </>
            </Card>
          </>
        ),
      }}
    />
  );
};

const mapStateToProps = state => {
  return { userProfile: state.user.userProfile };
};

export default connect(mapStateToProps)(NotesTable);
