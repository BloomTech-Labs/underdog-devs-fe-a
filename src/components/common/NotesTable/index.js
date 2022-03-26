import React, { useState, useEffect } from 'react';
import {
  Button,
  Avatar,
  Card,
  Comment,
  Table,
  Space,
  Dropdown,
  Menu,
} from 'antd';
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
      .get('https://mocki.io/v1/cc34de61-aaf5-4725-b0c9-6d67efa3aff3')
      .then(res => {
        console.log(res.data);
        setData(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  // click handlers
  const handleMenuClick = e => console.log('click', e);
  const handleDropDownClick = e => console.log('click', e);

  // Dropdown menu items
  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1">Resolved</Menu.Item>
      <Menu.Item key="2">2nd menu item</Menu.Item>
      <Menu.Item key="3">3rd menu item</Menu.Item>
    </Menu>
  );

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
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Space wrap>
                <Dropdown.Button overlay={menu} onClick={handleDropDownClick}>
                  Mark Note As
                </Dropdown.Button>
              </Space>
            </div>
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
