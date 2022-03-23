import React from 'react';
import { Card } from 'antd';
import MentorsCard from './MentorsCard';

const MentorMenteeInfo = () => {
  const fakeData = [
    {
      information: {
        email: 'random@gmail.com',
        phone: '123-123-123',
        random: 'random',
      },
      Mentors: {
        first: 'Jimmy Bold',
        second: 'Sacha Cruz',
        third: 'George Reece',
      },
      Mentor_Info: {
        first: {
          email: 'random@gmail.com',
          phone: '123-123-123',
          random: 'random',
        },
      },
    },
  ];

  return (
    <>
      {fakeData.map(data => (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}
        >
          <Card title="Information" style={{ width: '30%' }}>
            <p>{data.information.email}</p>
            <p>{data.information.phone}</p>
            <p>{data.information.random}</p>
          </Card>

          <MentorsCard data={data} />

          <Card title="Mentor Information" style={{ width: '30%' }}>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
        </div>
      ))}
    </>
  );
};

export default MentorMenteeInfo;
