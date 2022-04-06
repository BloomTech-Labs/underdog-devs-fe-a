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
import '../styles/Notes.css';
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

const NotesTable = ({ userProfile, accounts }) => {
  const [data, setData] = useState([]);
  let result;
  // edit users own comment states
  const [editing, setEditing] = useState(false);
  const [editNote, setEditNote] = useState({ key: '', content: '' });
  const [submitting, setSubmitting] = useState(false);
  // Get profile_id of logged in user
  const { profile_id } = userProfile;
  const location = useLocation();
  // Dummy data for table
  useEffect(() => {
    axiosWithAuth()
      .get(
        location.pathname === '/notes' || '/mynotes'
          ? '/notes'
          : `/notes/mentees/${accounts.key}`
      )
      .then(res => {
        console.log(res);
        setData(
          res.data.map(obj => {
            let created = new Date(obj.created_at);
            return {
              ...obj,
              key: obj.note_id,
              date: created.toDateString(),
              time: created.toLocaleTimeString(),
            };
          })
        );
      })
      .catch(err => {
        console.log(err.message);
      });
  }, []);
  if (location.pathname === '/mynotes') {
    result = data.filter(
      x => x.mentor_id === profile_id || x.mentee_id === profile_id
    );
  } else {
    result = data;
  }
  console.log(result);
  // click handlers
  const handleMenuClick = e => console.log('click', e);
  const handleDropDownClick = e => console.log('click', e);
  const toggle = (note_id, content) => {
    setEditing(!editing);
    setEditNote({ note_id: note_id, content: content });
  };
  // dummy api update call, needs actual api endpoint to update
  const handleSaveButton = () => {
    axiosWithAuth()
      .put('/notes', { content: editNote.content })
      .then(res => {
        console.log(res.data);
        setEditing(false);
        setSubmitting(false);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const handleChange = e => {
    setEditNote({ ...editNote, content: e.target.value });
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
                    profile_id === record.mentor_id ||
                    profile_id === record.mentee_id ? (
                      <Button
                        type="primary"
                        size="middle"
                        onClick={() => toggle(record.note_id, record.content)}
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
                      {editing && profile_id === record.note_id ? (
                        <Editor
                          onChange={handleChange}
                          onSubmit={handleSaveButton}
                          onCancel={handleCancel}
                          value={editNote.content}
                        />
                      ) : (
                        <>{record.content}</>
                      )}
                    </>
                  }
                ></Comment>
              </>
            </Card>
            <div className="note-menu-btns">
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
