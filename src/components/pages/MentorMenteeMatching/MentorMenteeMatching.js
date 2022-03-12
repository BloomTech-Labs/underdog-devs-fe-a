import React, { useEffect, useState } from 'react';
import axiosWithAuth from '../../../utils/axiosWithAuth';
import { EditOutlined } from '@ant-design/icons';

import { Table } from 'antd';
import { Card } from 'antd';
import { Tag, Space } from 'antd';

const MentorMenteeMatching = () => {
  const [assignments, setAssignments] = useState([]);

  const [edit, setEdit] = useState(false);

  useEffect(() => {
    const getAssignments = () => {
      axiosWithAuth()
        .get('/assignments')
        .then(res => {
          setAssignments(res.data);
        });
    };
    getAssignments();
  }, []);

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Contact', dataIndex: 'contact', key: 'contact' },
    {
      title: 'Status',
      key: 'tags',
      dataIndex: 'tags',
      render: tag => (
        <Tag color={tag === 'Unmatched' ? 'red' : 'green'}>{tag}</Tag>
      ),
    },
    { title: 'Stack', dataIndex: 'stack', key: 'stack' },
  ];

  const data = [];

  assignments.map(p => {
    const profile = {
      key: p.profile_id,
      name: `${p.first_name} ${p.last_name}`,
      contact: p.email,
      stack: 'HTML, JS, CSS',
      description: 'Description goes here',
      tags: p.matched ? 'Matched' : 'Unmatched',
    };
    data.push(profile);
  });

  let cards = (
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
              style={{ paddingLeft: '5px', width: '80%', height: '3.3vh' }}
              placeholder="Assign Mentor"
              value="Card Content"
            />
          </div>
        ) : (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <p>Card Content</p>
          </div>
        )}

        {edit ? (
          <div style={{ width: '80%', marginTop: '20px' }}>
            <input
              style={{ paddingLeft: '5px', width: '80%', height: '3.3vh' }}
              placeholder="Assign Mentor"
              value="Card Content"
            />
          </div>
        ) : (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <p>Card Content</p>
          </div>
        )}
        {edit ? (
          <div style={{ width: '80%', marginTop: '20px' }}>
            <input
              style={{
                paddingLeft: '5px',
                width: '80%',
                height: '3.3vh',
              }}
              placeholder="Assign Mentor"
              value="Card Content"
            />
          </div>
        ) : (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
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

  return (
    <>
      <h2>Matching</h2>
      <Table
        columns={columns}
        expandable={{
          expandedRowRender: record => <div style={{ margin: 0 }}>{cards}</div>,
          rowExpandable: record => record.name !== 'Not Expandable',
        }}
        dataSource={data}
      />
    </>
  );
};

export default MentorMenteeMatching;
