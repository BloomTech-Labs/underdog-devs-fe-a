import React, { useState } from 'react';
import { Card } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { select } from './MentorOptions';

const MentorsCard = ({ data }) => {
  const [edit, setEdit] = useState(false);

  const [mentors, setMentors] = useState({
    first: '',
    second: '',
    third: '',
  });

  const key = Object.keys(mentors);

  return (
    <>
      <Card
        title="Mentors"
        style={{
          width: '30%',
        }}
        extra={
          !mentors.first && !mentors.second && !mentors.third ? (
            ''
          ) : edit ? (
            <p
              onClick={() => setEdit(!edit)}
              style={{
                textDecoration: 'underline',
                cursor: 'pointer',
              }}
            >
              save
            </p>
          ) : (
            <EditOutlined
              style={{ marginTop: '2px' }}
              onClick={() => setEdit(!edit)}
            />
          )
        }
      >
        <div>
          {select(edit, mentors.first, setMentors, mentors, key[0], data)}
        </div>
        <div style={{ marginTop: '17px' }}>
          {select(edit, mentors.second, setMentors, mentors, key[1], data)}
        </div>
        <div style={{ marginTop: '17px' }}>
          {select(edit, mentors.third, setMentors, mentors, key[2], data)}
        </div>
      </Card>
    </>
  );
};

export default MentorsCard;
