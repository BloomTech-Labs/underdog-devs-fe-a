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
  List,
  Input,
} from 'antd';
import { columns } from './NoteUtils';
import axiosWithAuth from '../../../utils/axiosWithAuth';
import { connect } from 'react-redux';

const NotesTable = ({ userProfile }) => {
  const [data, setData] = useState([]);
  // edit users own comment states
  const [editing, setEditing] = useState(false);
  const [editNote, setEditNote] = useState({ key: '', note: '' });
  const [submitting, setSubmitting] = useState(false);
  // Get profile_id of logged in user
  const { profile_id } = userProfile;
  const { TextArea } = Input;

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
  const toggle = (key, note) => {
    //editing note is currently for all comments
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

  // edit comment ant framework
  const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <>
      <Form.Item>
        <TextArea rows={4} onChange={onChange} value={value} />
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
        <Button onClick={handleCancel}>Cancel</Button>
      </Form.Item>
    </>
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
                      {editing ? (
                        <Editor
                          onChange={handleChange}
                          onSubmit={handleSaveButton}
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
