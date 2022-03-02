import React, { useEffect, useState } from 'react';
import axiosWithAuth from '../../../utils/axiosWithAuth';

import { Table } from 'antd';
import { Card } from 'antd';
import { Tag, Space } from 'antd';

const MentorMenteeMatching = () => {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const getAssignments = () => {
      axiosWithAuth()
        .get('/assignments')
        .then(res => {
          console.log(res.data);
          //   setAssignments(res);
          // test comment
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

  const data = [
    {
      key: 1,
      name: 'Billy Bob',
      contact: 'email@email.com',
      tags: 'Matched',
      stack: 'HTML, JS, CSS',
      description:
        'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
      key: 2,
      name: 'Jim Green',
      contact: '3055555555',
      tags: 'Unmatched',
      stack: 'MERN',
      description:
        'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
    },
    {
      key: 3,
      name: 'Gary Bucey',
      contact: 'email3@email.com',
      tags: 'Matched',
      stack: 'HTML, JS, CSS',
      description: 'This not expandable',
    },
    {
      key: 4,
      name: 'Joe Black',
      contact: 'email4@email.com',
      tags: 'Matched',
      stack: 'Python',
      description:
        'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
    },
  ];

  let cards = (
    <div
      style={{
        display: 'flex',
        'flex-direciton': 'row',
        'justify-content': 'space-evenly',
      }}
    >
      <Card title="Information" style={{ width: '30%' }}>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </Card>
      <Card title="Mentors" style={{ width: '30%' }}>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </Card>
      <Card title="Mentor Infromation" style={{ width: '30%' }}>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </Card>
    </div>
  );

  // let cards = [card, card2];

  return (
    <>
      <h2>Matching</h2>
      <Table
        columns={columns}
        expandable={{
          expandedRowRender: record => <p style={{ margin: 0 }}>{cards}</p>,
          rowExpandable: record => record.name !== 'Not Expandable',
        }}
        dataSource={data}
      />
    </>
  );
};

export default MentorMenteeMatching;
