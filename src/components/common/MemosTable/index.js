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
import { columns } from './MemoUtils';
import axiosWithAuth from '../../../utils/axiosWithAuth';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import ReplyInput from './AddReply/Reply';
import '../styles/Memos.css';

import createBrowserHistory from 'history/createBrowserHistory';
const history = createBrowserHistory({
  forceRefresh: true,
});

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
        style={{}}
      >
        Save edit
      </Button>
      <Button onClick={onCancel}>Cancel</Button>
    </Form.Item>
  </>
);

const MemosTable = ({ userProfile, accounts }) => {
  const [data, setData] = useState([]);
  let result;
  // edit users own comment states
  const [editing, setEditing] = useState(false);
  const [editMemo, setEditMemo] = useState({ key: '', content: '' });
  const [submitting, setSubmitting] = useState(false);
  // reply on comment popup state
  const [replyPopup, setReplypopup] = useState(false);
  // Get profile_id of logged in user
  const { profile_id } = userProfile;
  const location = useLocation();
  // Dummy data for table
  useEffect(() => {
    axiosWithAuth()
      .get(
        location.pathname === '/memos' || '/mymemos'
          ? '/notes'
          : `/notes/mentees/${accounts.key}`
      )
      .then(res => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editing]);

  if (location.pathname === '/mymemos') {
    result = data.filter(
      x => x.mentor_id === profile_id || x.mentee_id === profile_id
    );
  } else {
    result = data;
  }
  // click handlers
  const handleMenuClick = e => console.log('click', e);
  const handleDropDownClick = e => console.log('click', e);
  const toggle = (note_id, content) => {
    setEditing(!editing);
    setEditMemo({ note_id: note_id, content: content });
  };
  // dummy api update call, needs actual api endpoint to update
  const handleSaveButton = () => {
    axiosWithAuth()
      .put(`/notes/${editMemo.note_id}`, { content: editMemo.content })
      .then(res => {
        // currently the edit component reorders the seed data when updating a memo
        setEditing(false);
        setSubmitting(false);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const handleDeleteButton = note_id => {
    axiosWithAuth()
      .delete(`/notes/${note_id}`)
      .then(res => {
        history.push('/memos');
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleChange = e => {
    setEditMemo({ ...editMemo, content: e.target.value });
  };
  const handleCancel = () => {
    setEditing(!editing);
    if (submitting) setSubmitting(!submitting);
  };
  const showPopup = () => {
    setReplypopup(true);
  };
  // Dropdown menu items
  const menu = (
    // <Menu onClick={handleMenuClick}>
    //   <Menu.Item key="1">Resolved</Menu.Item>
    //   <Menu.Item key="2">2nd menu item</Menu.Item>
    //   <Menu.Item key="3">3rd menu item</Menu.Item>
    // </Menu>
    <Menu
      onClick={handleMenuClick}
      items={[
        {
          key: '1',
          label: 'Resolved',
        },
        {
          key: '2',
          label: '2nd menu item',
        },
        {
          key: '3',
          label: '3rd menu item',
        },
      ]}
    />
  );
  return (
    <Table
      columns={columns}
      dataSource={[...result]}
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
                      <>
                        <Button
                          type="primary"
                          size="middle"
                          onClick={() => toggle(record.note_id, record.content)}
                          style={{ display: editing ? 'none' : 'inline' }}
                        >
                          Edit
                        </Button>

                        <Button
                          type="primary"
                          size="middle"
                          onClick={() => handleDeleteButton(record.note_id)}
                          // style={{ display: editing ? 'none' : 'inline' }}
                        >
                          Delete
                        </Button>
                      </>
                    ) : (
                      // reply button may be out the door
                      <Button
                        key="comment-nested-reply-to"
                        type="primary"
                        size="middle"
                        onClick={showPopup}
                      >
                        Reply
                      </Button>
                    ),
                    <ReplyInput
                      trigger={replyPopup}
                      setTrigger={setReplypopup}
                    />,
                  ]}
                  author={
                    profile_id === record.mentor_id
                      ? record.mentor_id
                      : record.mentee_id
                  }
                  avatar={
                    <Avatar
                      src="https://joeschmoe.io/api/v1/random"
                      alt={record.createdBy} //currently no backend column for this
                    />
                  }
                  content={
                    // populating edit text box with previous value
                    <>
                      {editing &&
                      (profile_id === record.mentor_id ||
                        profile_id === record.mentee_id) ? (
                        <Editor
                          onChange={handleChange}
                          onSubmit={handleSaveButton}
                          onCancel={handleCancel}
                          value={editMemo.content}
                        />
                      ) : (
                        <>{record.content}</>
                      )}
                    </>
                  }
                ></Comment>
              </>
            </Card>
            <div className="memo-menu-btns">
              <Space wrap>
                <Dropdown.Button overlay={menu} onClick={handleDropDownClick}>
                  Mark Memo As
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

export default connect(mapStateToProps)(MemosTable);
