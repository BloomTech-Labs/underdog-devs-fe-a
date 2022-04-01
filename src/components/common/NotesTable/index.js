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
  Form,
  Input,
} from 'antd';
import { columns } from './NoteUtils';
import axiosWithAuth from '../../../utils/axiosWithAuth';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
// edit comment ant framework
const Editor = ({ onChange, onSubmit, submitting, onCancel, value }) => (
  <>
    <Form.Item>
      <Input.TextArea rows={4} onChange={onChange} defaultValue={value} />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        Save edit
      </Button>
      <Button onClick={onCancel}>Cancel</Button>
    </Form.Item>
  </>
);

const NotesTable = ({ userProfile }) => {
  console.log(userProfile);
  const [data, setData] = useState([]);
  let result;
  // edit users own comment states
  const [editing, setEditing] = useState(false);
  const [editNote, setEditNote] = useState({ key: '', note: '' });
  const [submitting, setSubmitting] = useState(false);
  // Get profile_id of logged in user
  const { profile_id } = userProfile;
  const location = useLocation();
  console.log(location.pathname);
  // Dummy data for table
  useEffect(() => {
    axiosWithAuth()
      .get('https://mocki.io/v1/2b5cfd79-fe47-42b3-afa0-86848854394b')
      .then(res => {
        console.log(res.data);
        setData(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  if (location.pathname === '/mynotes') {
    result = data.filter(x => x.profile_id === profile_id);
  } else {
    result = data;
  }
  // click handlers
  const handleMenuClick = e => console.log('click', e);
  const handleDropDownClick = e => console.log('click', e);
  const toggle = (key, note) => {
    setEditing(!editing);
    setEditNote({ key: key, note: note });
  };
  // dummy api update call, needs actual api endpoint to update
  const handleSaveButton = () => {
    axiosWithAuth()
      .put('dummydata', { note: editNote.note })
      .then(res => {
        console.log(res);
        setEditing(false);
        setSubmitting(false);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const handleChange = e => {
    setEditNote({ ...editNote, note: e.target.value });
  };
  const handleCancel = () => {
    setEditing(!editing);
    if (submitting) setSubmitting(!submitting);
  };

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
      dataSource={result}
      expandable={{
        expandedRowRender: record => (
          <>
            <Card style={{ marginBottom: '1%' }}>
              <>
                <Comment
                  actions={[
                    // edit button
                    profile_id === record.profile_id ? (
                      <Button
                        type="primary"
                        size="middle"
                        onClick={() => toggle(record.key, record.note)}
                        style={{ display: editing ? 'none' : 'inline' }}
                      >
                        Edit
                      </Button>
                    ) : (
                      // reply button may be out the door
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
                  content={
                    // populating edit text box with previous value
                    <>
                      {editing && profile_id === record.profile_id ? (
                        <Editor
                          onChange={handleChange}
                          onSubmit={handleSaveButton}
                          onCancel={handleCancel}
                          value={editNote.note}
                        />
                      ) : (
                        <>{record.note}</>
                      )}
                    </>
                  }
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
