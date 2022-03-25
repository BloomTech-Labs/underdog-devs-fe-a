import React, { useState } from 'react';
import { Card, Select } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { options, empty } from './MentorOptions';

const MentorsCard = ({ data }) => {
  const [edit, setEdit] = useState(false);

  const [mentors, setMentors] = useState({
    first: '',
    second: '',
    third: '',
  });

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
        {edit || empty(mentors.first) ? (
          <div style={{ width: '80%' }}>
            <Select
              name="first"
              onChange={value => setMentors({ ...mentors, first: value })}
              showSearch
              style={{ width: '100%' }}
              optionFilterProp="children"
              value={mentors.first || 'Assign Mentor'}
            >
              {options(data)}
            </Select>
          </div>
        ) : (
          <div style={{ width: '80%' }}>
            <p style={{ marginLeft: '5px' }}>{mentors.first}</p>
          </div>
        )}

        {edit || empty(mentors.second) ? (
          <div style={{ width: '80%', marginTop: '20px' }}>
            <Select
              name="second"
              onChange={value => setMentors({ ...mentors, second: value })}
              showSearch
              style={{ width: '100%' }}
              optionFilterProp="children"
              value={mentors.second || 'Assign Mentor'}
            >
              {options(data)}
            </Select>
          </div>
        ) : (
          <div style={{ width: '80%' }}>
            <p style={{ marginTop: '15px', marginLeft: '5px' }}>
              {mentors.second}
            </p>
          </div>
        )}
        {edit || empty(mentors.third) ? (
          <div style={{ width: '80%', marginTop: '20px' }}>
            <Select
              name="third"
              onChange={value => setMentors({ ...mentors, third: value })}
              showSearch
              style={{ width: '100%' }}
              optionFilterProp="children"
              value={mentors.third || 'Assign Mentor'}
            >
              {options(data)}
            </Select>
          </div>
        ) : (
          <div style={{ width: '80%' }}>
            <p style={{ marginTop: '15px', marginLeft: '5px' }}>
              {mentors.third}
            </p>
          </div>
        )}
      </Card>
    </>
  );
};

export default MentorsCard;
