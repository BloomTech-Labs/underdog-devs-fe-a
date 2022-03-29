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

  const rest = [edit, setMentors, mentors, data];

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
        <div>{select(...rest, mentors.first, key[0])}</div>
        <div style={{ marginTop: '17px' }}>
          {select(...rest, mentors.second, key[1])}
        </div>
        <div style={{ marginTop: '17px' }}>
          {select(...rest, mentors.third, key[2])}
        </div>
      </Card>
    </>
  );
};

export default MentorsCard;
