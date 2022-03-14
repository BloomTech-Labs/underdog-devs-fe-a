import React, { useState } from 'react';
import { Card } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import './MentorMatching.css';

const MentorMenteeInfo = () => {
  const [edit, setEdit] = useState(false);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
      }}
    >
      <Card title="Information" style={{ width: '30%' }}>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </Card>
      <Card
        title="Mentors"
        style={{
          width: '30%',
        }}
        extra={<EditOutlined onClick={() => setEdit(!edit)} />}
      >
        {edit ? (
          <div style={{ width: '80%' }}>
            <input
              className={
                localStorage.getItem('theme') === 'dark'
                  ? 'mentors-dark'
                  : 'mentors'
              }
              placeholder="Assign Mentor"
              value="Card Content"
            />
          </div>
        ) : (
          <div>
            <p>Card Content</p>
          </div>
        )}

        {edit ? (
          <div style={{ width: '80%', marginTop: '20px' }}>
            <input
              className={
                localStorage.getItem('theme') === 'dark'
                  ? 'mentors-dark'
                  : 'mentors'
              }
              placeholder="Assign Mentor"
              value="Card Content"
            />
          </div>
        ) : (
          <div>
            <p>Card Content</p>
          </div>
        )}
        {edit ? (
          <div style={{ width: '80%', marginTop: '20px' }}>
            <input
              className={
                localStorage.getItem('theme') === 'dark'
                  ? 'mentors-dark'
                  : 'mentors'
              }
              placeholder="Assign Mentor"
              value="Card Content"
            />
          </div>
        ) : (
          <div>
            <p>Card Content</p>
          </div>
        )}
      </Card>
      <Card title="Mentor Information" style={{ width: '30%' }}>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </Card>
    </div>
  );
};

export default MentorMenteeInfo;
