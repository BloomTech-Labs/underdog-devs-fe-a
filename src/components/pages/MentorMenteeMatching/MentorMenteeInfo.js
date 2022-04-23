import React from 'react';
import { Card } from 'antd';
import MentorsCard from './MentorsCard';

const MentorMenteeInfo = props => {
  const { dataSource, id } = props;

  return (
    <>
      {dataSource.map(data => {
        if (data.key === id) {
          return (
            <div
              key={data.key}
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
              }}
            >
              <Card title="Information" style={{ width: '30%' }}>
                <p>{`Email: ${data.email}`}</p>
                <p>{`Location: ${data.location}`}</p>
                <p>{`Company: ${data.company}`}</p>
              </Card>

              <MentorsCard data={data} />

              <Card title="Mentor Information" style={{ width: '30%' }}>
                <p>Card content</p>
                <p>Card content</p>
                <p>Card content</p>
              </Card>
            </div>
          );
        }
        return <div key={data.key}></div>;
      })}
    </>
  );
};

export default MentorMenteeInfo;
