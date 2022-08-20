import React, { useState } from 'react';
import { Card } from 'antd';
import { EditOutlined } from '@ant-design/icons';

import { Selected } from './MentorOptions';

const MentorsCard = ({ data, match }) => {
  const [edit, setEdit] = useState(false);

  const [mentors, setMentors] = useState();

  const rest = [edit, setMentors, data, mentors];

  const key = Object.keys(data);

  return (
    <>
      <Card
        title="Match"
        style={{
          width: '30%',
        }}
        extra={
          !match ? (
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
        {/**
         * Owner: Khaleel Musleh
         * Props Being Passed:
         * Props: Selected{...rest} from MentorMenteeMatching to MentorMenteeInfo to MentorsCard
         */}

        <div>{Selected(...rest)}</div>
        <div style={{ marginTop: '17px' }}>
          {Selected(...rest, data[1], key[1])}
        </div>
        <div style={{ marginTop: '17px' }}>
          {Selected(...rest, data[2], key[2])}
        </div>
      </Card>
    </>
  );
};

export default MentorsCard;
